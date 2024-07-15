import sql from '../db'
import { NextResponse } from 'next/server'
import { user } from '../../globalVariable'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`
  WITH interests_count AS (
    SELECT 
        t.id AS team_id,
        STRING_AGG(DISTINCT s.skill, ', ') AS aligned_interests_names,
        COUNT(DISTINCT psi.skill_id) AS aligned_interests_count
    FROM 
        TEAMS t
    JOIN 
        TEAM_SKILLS ts ON t.id = ts.team_id
    JOIN 
        PERSON_SKILL_INTERESTS psi ON ts.skill_id = psi.skill_id
    JOIN 
        SKILLS s ON psi.skill_id = s.id
    JOIN 
        PEOPLE p ON psi.person_id = p.id
    WHERE 
        p.name = ${user}
    GROUP BY 
        t.id
  ),
  team_interests AS (
      SELECT 
          t.id AS team_id,
          STRING_AGG(DISTINCT s.skill, ', ') AS team_interests_names
      FROM 
          TEAMS t
      JOIN 
          TEAM_SKILLS ts ON t.id = ts.team_id
      JOIN 
          SKILLS s ON ts.skill_id = s.id
      GROUP BY 
          t.id
  ),
  aligned_interests AS (
      SELECT 
          ts.team_id,
          ARRAY_AGG(s.skill) AS aligned_skills
      FROM 
          TEAM_SKILLS ts
      JOIN 
          SKILLS s ON ts.skill_id = s.id
      JOIN 
          PERSON_SKILL_INTERESTS psi ON psi.skill_id = s.id
      JOIN 
          PEOPLE p ON psi.person_id = p.id
      WHERE 
          p.name = ${user}
      GROUP BY 
          ts.team_id
  ),
  needed_skills_count AS (
      SELECT
          t.id AS team_id,
          COUNT(DISTINCT ts.skill_id) AS needed_skill_count
      FROM
          TEAMS t
      JOIN
          TEAM_SKILLS ts ON t.id = ts.team_id
      WHERE
          ts.needed_for_team = TRUE
      GROUP BY
          t.id
  ),
  needed_skills AS (
      SELECT
          ts.team_id AS team_id,
          STRING_AGG(DISTINCT s.skill, ', ') AS needed_skills_names
      FROM
          TEAM_SKILLS ts
      JOIN
          SKILLS s ON ts.skill_id = s.id
      LEFT JOIN
          PERSON_SKILLS ps ON ps.skill_id = s.id -- Join with PERSON_SKILLS table
          AND ps.person_id = (SELECT id FROM PEOPLE WHERE name = ${user})
      WHERE
          ts.needed_for_team = TRUE
          AND ps.skill_id IS NULL -- Exclude skills that the person has
      GROUP BY
          ts.team_id
  )
  SELECT 
      t.id AS team_id,
      t.name AS team_name,
      t.description AS team_description,
      tl.name AS team_lead_name,
      tl.email AS team_lead_email,
      JSON_AGG(json_build_object('grade', ta.grade, 'quantity', ta.quantity)) AS availabilities,
      ic.aligned_interests_names,
      COALESCE(ic.aligned_interests_count, 0) AS aligned_interests_count,
      COALESCE(ARRAY_TO_STRING(ARRAY(SELECT DISTINCT s.skill 
                                  FROM TEAM_SKILLS ts 
                                  JOIN SKILLS s ON ts.skill_id = s.id
                                  WHERE ts.team_id = t.id 
                                  AND s.skill NOT IN (SELECT UNNEST(ai.aligned_skills) FROM aligned_interests ai)
                                ), ', '), 'No other interests covered') AS other_interests_covered,
      COALESCE(nsc.needed_skill_count, 0) AS needed_skill_count,
      COALESCE(ns.needed_skills_names, '') AS needed_skills_names
  FROM 
      TEAMS t
  LEFT JOIN 
      interests_count ic ON t.id = ic.team_id
  LEFT JOIN 
      PEOPLE tl ON t.team_lead_person_id = tl.id
  LEFT JOIN 
      TEAM_AVAILABILITY ta ON t.id = ta.team_id
  LEFT JOIN 
      team_interests ti ON t.id = ti.team_id
  LEFT JOIN 
      needed_skills_count nsc ON t.id = nsc.team_id
  LEFT JOIN 
      needed_skills ns ON t.id = ns.team_id
  WHERE 
      ic.aligned_interests_count > 0
  GROUP BY 
      t.id, t.name, t.description, tl.name, tl.email, ic.aligned_interests_names, ic.aligned_interests_count, nsc.needed_skill_count, ns.needed_skills_names
  ORDER BY 
      aligned_interests_count DESC;

  `;
  const teamsAndSkills = NextResponse.json(response);
  return teamsAndSkills;
};