import sql from '../db'
import { NextResponse } from 'next/server'
import { user } from '../../globalVariable'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`
  WITH Skill_Interests AS (
    SELECT
        psi.skill_id,
        s.skill AS interest_name,
        ARRAY_AGG(
            DISTINCT t.name
        ) AS team_names
    FROM
        PERSON_SKILL_INTERESTS psi
    JOIN
        SKILLS s ON psi.skill_id = s.id
    JOIN
        PEOPLE p ON psi.person_id = p.id
    LEFT JOIN
        PERSON_SKILLS ps ON ps.skill_id = psi.skill_id AND ps.person_id = p.id
    LEFT JOIN
        TEAM_SKILLS ts ON ts.skill_id = psi.skill_id
    LEFT JOIN
        TEAMS t ON ts.team_id = t.id
    WHERE
        p.name = ${user}
        AND ps.skill_id IS NULL
    GROUP BY
        psi.skill_id, s.skill
  ), Learning_Paths AS (
      SELECT
          s.id AS skill_id,
          s.skill AS skill_name,
          ARRAY_AGG(
              JSON_BUILD_OBJECT(
                  'resource_name', l.resource_name,
                  'resource_type', l.resource_type,
                  'resource_link', l.resource_link
              )
          ) AS learning_paths
      FROM
          SKILLS s
      JOIN
          LEARNING l ON s.id = l.skill_id
      WHERE
          s.id IN (SELECT skill_id FROM Skill_Interests)
      GROUP BY
          s.id, s.skill
  )
  SELECT
      si.skill_id,
      si.interest_name AS skill_name,
      si.team_names,
      lp.learning_paths
  FROM
      Skill_Interests si
  JOIN
      Learning_Paths lp ON si.skill_id = lp.skill_id
  ORDER BY
      si.skill_id;
  `;
  const teamsAndSkills = NextResponse.json(response);
  return teamsAndSkills;
};