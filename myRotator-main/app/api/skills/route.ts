import sql from '../db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const response = await sql`SELECT skill from skills`;
  const userDetails = NextResponse.json(response);
  return userDetails;
};