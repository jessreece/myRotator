import sql from '../db'
import { NextResponse } from 'next/server'
import { user } from '../../globalVariable'

export const dynamic = 'force-dynamic'

// only have the most recent last team in the db
export const GET = async () => {
  const response = await sql`SELECT 
  p.*, 
  s.name AS supervisor_name, 
  s.email AS supervisor_email, 
  lt.name AS last_team_name, 
  ct.name AS current_team_name
FROM 
  PEOPLE p
LEFT JOIN 
  PEOPLE s ON p.supervisor_id = s.id
LEFT JOIN 
  PERSON_TEAM_PAST_ASSIGNMENT ltpa ON p.id = ltpa.person_id
LEFT JOIN 
  TEAMS lt ON ltpa.team_id = lt.id
LEFT JOIN 
  PERSON_TEAM_CURRENT_ASSIGNMENT cta ON p.id = cta.person_id
LEFT JOIN 
  TEAMS ct ON cta.team_id = ct.id
WHERE 
  p.name = ${user};
  `;
  const userDetails = NextResponse.json(response);
  return userDetails;
};