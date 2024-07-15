import sql from '../db';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'url';

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        // Extract the URL from the request
        const parsedUrl = parse(req.url || '', true);
        console.log(parsedUrl); // Log the parsed URL object to see its structure

        // Extract the teamName parameter from the query object
        let teamName = Object.keys(parsedUrl.query)[0]; // Get the first key from the query object
        teamName = decodeURIComponent(teamName);

        console.log('Received teamName:', teamName);

        if (!teamName) {
            throw new Error('Missing teamName parameter');
        }

        const response = await sql`
        SELECT 
            t.*,
            tl.name AS team_lead_name,
            ARRAY_AGG(DISTINCT jsonb_build_object('skill', s.skill, 'needed', ts.needed_for_team)) AS skill_names,
            (SELECT jsonb_agg(jsonb_build_object('grade', ta.grade, 'quantity', ta.quantity)) 
            FROM (SELECT DISTINCT grade, quantity FROM TEAM_AVAILABILITY WHERE team_id = t.id) ta) AS availabilities,
            ARRAY_AGG(DISTINCT p.name) AS people_names,
            jsonb_agg(DISTINCT jsonb_build_object('skill', s.skill, 'learning_paths', lps.learning_paths)) AS learning_paths
        FROM 
            TEAMS t
        LEFT JOIN 
            PEOPLE tl ON t.team_lead_person_id = tl.id
        LEFT JOIN 
            TEAM_SKILLS ts ON t.id = ts.team_id
        LEFT JOIN 
            SKILLS s ON ts.skill_id = s.id
        LEFT JOIN 
            PERSON_TEAM_CURRENT_ASSIGNMENT ptca ON t.id = ptca.team_id
        LEFT JOIN 
            PEOPLE p ON ptca.person_id = p.id
        LEFT JOIN 
            (SELECT 
                ts.skill_id,
                jsonb_agg(DISTINCT jsonb_build_object('resource_name', l.resource_name, 'resource_type', l.resource_type, 'resource_link', l.resource_link)) AS learning_paths
            FROM 
                TEAM_SKILLS ts
            LEFT JOIN 
                LEARNING l ON ts.skill_id = l.skill_id
            GROUP BY 
                ts.skill_id
            ) lps ON ts.skill_id = lps.skill_id
        WHERE 
            t.name = ${teamName}
        GROUP BY 
            t.id, tl.id;                  
      `;
        const nonArrayResponse = response[0]
        if (response) {
            return NextResponse.json(nonArrayResponse);
        } else {
            // Handle the case where the query did not return any data
            return NextResponse.error();
        }
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching team details:', error);
        return NextResponse.error();
    }
}
