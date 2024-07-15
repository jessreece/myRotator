import sql from '../db'
import { NextResponse } from 'next/server'
import { user } from '../../globalVariable'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`SELECT p.id AS person_id, psi.skill_id, s.skill AS skill_name
  FROM people p 
  JOIN person_skill_interests psi ON p.id = psi.person_id
  JOIN skills s ON psi.skill_id = s.id
  WHERE p.name = ${user};  
  `;
  const userDetails = NextResponse.json(response);
  return userDetails;
};