import sql from '../db'
import { NextResponse } from 'next/server'
import { user } from '../../globalVariable'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`
  WITH needed_team_skills AS (
    SELECT
        TEAMS.name AS team_name,
        ARRAY_AGG(SKILLS.skill) AS needed_skills
    FROM
        TEAMS
    JOIN
        TEAM_SKILLS ON TEAMS.id = TEAM_SKILLS.team_id
    JOIN
        SKILLS ON TEAM_SKILLS.skill_id = SKILLS.id
    WHERE
        TEAM_SKILLS.needed_for_team = TRUE
    GROUP BY
        TEAMS.name
  ),
  user_skills AS (
      SELECT 
          psi.person_id,
          s.id AS skill_id
      FROM 
          PERSON_SKILLS psi
      JOIN 
          SKILLS s ON psi.skill_id = s.id
      JOIN 
          PEOPLE p ON psi.person_id = p.id
      WHERE 
          p.name = ${user}
  ),
  team_skills AS (
      SELECT 
          t.id AS team_id,
          s.id AS skill_id
      FROM 
          TEAMS t
      JOIN 
          TEAM_SKILLS ts ON t.id = ts.team_id
      JOIN 
          SKILLS s ON ts.skill_id = s.id
  ),
  team_details AS (
      SELECT 
          t.id AS team_id,
          t.name AS team_name,
          t.description AS team_description,
          tl.name AS team_lead_name,
          tl.email AS team_lead_email,
          s.skill AS aligned_skill_name
      FROM 
          user_skills u
      JOIN 
          team_skills ts ON u.skill_id = ts.skill_id
      JOIN 
          TEAMS t ON t.id = ts.team_id
      LEFT JOIN 
          PEOPLE tl ON t.team_lead_person_id = tl.id
      LEFT JOIN 
          SKILLS s ON u.skill_id = s.id
      GROUP BY 
          t.id, t.name, t.description, tl.name, tl.email, s.skill
  ),
  filtered_needed_skills AS (
      SELECT 
          team_name,
          UNNEST(needed_skills) AS needed_skill
      FROM 
          needed_team_skills
      WHERE 
          team_name IN (SELECT DISTINCT team_name FROM team_details)
  )
  SELECT 
      team_details.team_id,
      team_details.team_name,
      team_details.team_description,
      team_details.team_lead_name,
      team_details.team_lead_email,
      STRING_AGG(DISTINCT team_details.aligned_skill_name, ', ') AS aligned_skills,
      COUNT(DISTINCT team_details.aligned_skill_name) AS aligned_skill_count,
      ARRAY_TO_STRING(
          ARRAY(
              SELECT DISTINCT s.skill
              FROM SKILLS s
              JOIN TEAM_SKILLS ts ON s.id = ts.skill_id
              WHERE ts.team_id = team_details.team_id
                AND s.id NOT IN (
                    SELECT skill_id FROM user_skills
                )
                AND s.skill NOT IN (
                    SELECT needed_skill FROM filtered_needed_skills WHERE team_name = team_details.team_name
                )
          ), ', '
      ) AS other_skills_involved,
      ARRAY_TO_STRING(
          ARRAY(
              SELECT needed_skill
              FROM filtered_needed_skills
              WHERE team_name = team_details.team_name
                AND needed_skill NOT IN (
                    SELECT aligned_skill_name FROM team_details WHERE team_name = team_details.team_name
                )
          ), ', '
      ) AS needed_skills,
      (
          SELECT COUNT(needed_skill)
          FROM filtered_needed_skills
          WHERE team_name = team_details.team_name
            AND needed_skill NOT IN (
                SELECT aligned_skill_name FROM team_details WHERE team_name = team_details.team_name
            )
      ) AS needed_skill_count,
      (
          SELECT JSON_AGG(json_build_object('grade', TA.grade, 'quantity', COALESCE(TA.quantity, 0)))
          FROM (
              SELECT DISTINCT ON (grade) grade, quantity
              FROM TEAM_AVAILABILITY
              WHERE team_id = team_details.team_id
              ORDER BY grade
          ) AS TA
      ) AS availability_per_grade
  FROM 
      team_details
  LEFT JOIN 
      filtered_needed_skills ON team_details.team_name = filtered_needed_skills.team_name
  GROUP BY 
      team_details.team_id, team_details.team_name, team_details.team_description, team_details.team_lead_name, team_details.team_lead_email
  ORDER BY 
      aligned_skill_count DESC, needed_skill_count ASC;

  `;
  const teamsAndSkills = NextResponse.json(response);
  return teamsAndSkills;
};