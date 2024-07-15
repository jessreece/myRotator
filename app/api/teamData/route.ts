import sql from '../db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`
  SELECT
    t.id AS team_id,
    t.name AS team_name,
    t.description AS team_description,
    t.team_lead_person_id AS team_lead_person_id,
    COUNT(DISTINCT ts.skill_id) AS skills_needed_count,
    STRING_AGG(DISTINCT s1.skill, ', ') AS skills_needed_names,
    COALESCE(any_skills_required, 0) AS any_skills_required,
    COALESCE(any_skills_required_names, '') AS any_skills_required_names,
    p.name AS team_lead_name
  FROM
    TEAMS t
  LEFT JOIN
    TEAM_SKILLS ts ON t.id = ts.team_id
  JOIN
    PEOPLE p ON p.id = t.team_lead_person_id
  LEFT JOIN
    SKILLS s1 ON ts.skill_id = s1.id -- Join to get skill names for skills_needed_count
  LEFT JOIN (
    SELECT
        ts.team_id,
        COUNT(*) AS any_skills_required,
        STRING_AGG(s.skill, ', ') AS any_skills_required_names
    FROM
        TEAM_SKILLS ts
    JOIN
        SKILLS s ON ts.skill_id = s.id
    WHERE
        ts.needed_for_team
    GROUP BY
        ts.team_id
  ) AS any_skills ON t.id = any_skills.team_id
  GROUP BY
    t.id, t.name, t.description, t.team_lead_person_id, p.name, any_skills_required, any_skills_required_names
  ORDER BY
    t.id ASC;
  `;
  const teamsAndSkills = NextResponse.json(response);
  return teamsAndSkills;
};