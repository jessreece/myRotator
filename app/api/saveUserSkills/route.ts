import sql from '../db';
import { NextRequest, NextResponse } from 'next/server';
import { user } from '../../globalVariable'

export const POST = async (req: NextRequest) => {
  try {
    // Read the request body as text
    const bodyText = await req.text();

    // Parse the request body as JSON
    const requestBody = JSON.parse(bodyText);

    // Extract the skills property from the parsed body
    const { skills } = requestBody;

    // Check if skills is an array
    if (!Array.isArray(skills)) {
      throw new Error('Skills must be an array.');
    }

    // Delete existing user skills
    await sql`DELETE FROM person_skills WHERE person_id = (SELECT id FROM PEOPLE WHERE name = ${user} LIMIT 1)`;

    // Insert new user skills into the database
    for (const skill of skills) {
      await sql`INSERT INTO person_skills (person_id, skill_id) VALUES ((SELECT id FROM PEOPLE WHERE name = ${user} LIMIT 1), (SELECT id FROM SKILLS WHERE skill = ${skill} LIMIT 1))`;
    }

    // Send a success response
    return NextResponse.json({ success: true, message: 'User skills saved successfully.' });
  } catch (error) {
    console.error('Error saving user skills:', error);
    // Send an error response if an error occurs
    return NextResponse.error();
  }
};
