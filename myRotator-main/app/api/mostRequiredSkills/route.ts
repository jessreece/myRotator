import sql from '../db'
import { NextResponse } from 'next/server'
import { user } from '../../globalVariable'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`
  SELECT
      s.id AS skill_id,
      s.skill AS skill_name,
      teams_count,
      ARRAY_AGG(DISTINCT t.name) AS teams_for_skill,
      ARRAY_AGG(DISTINCT l.learning_path::jsonb) AS learning_paths
    FROM
      (
        SELECT
          ts.skill_id,
          COUNT(ts.team_id) AS teams_count
        FROM
          TEAM_SKILLS ts
        WHERE
          ts.needed_for_team = TRUE
        GROUP BY
          ts.skill_id
      ) teams_count_subquery
    JOIN
      SKILLS s ON teams_count_subquery.skill_id = s.id
    LEFT JOIN
      TEAM_SKILLS ts ON s.id = ts.skill_id
    LEFT JOIN
      TEAMS t ON ts.team_id = t.id
    LEFT JOIN
      (
        SELECT
          skill_id,
          JSON_BUILD_OBJECT('resource_name', resource_name, 'resource_link', resource_link, 'resource_type', resource_type) AS learning_path
        FROM
          LEARNING
      ) l ON s.id = l.skill_id
    LEFT JOIN
      (
        SELECT
          ps.skill_id
        FROM
          PEOPLE p
        JOIN
          PERSON_SKILLS ps ON p.id = ps.person_id
        WHERE
          p.name = ${user}
      ) j ON s.id = j.skill_id
    WHERE
      j.skill_id IS NULL
    GROUP BY
      s.id, s.skill, teams_count
    ORDER BY
      teams_count DESC;

  `;
  const teamsAndSkills = NextResponse.json(response);
  return teamsAndSkills;
};