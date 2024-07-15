import sql from '../db';
import { NextRequest, NextResponse } from 'next/server';
import { user } from '../../globalVariable'

export const POST = async (req: NextRequest) => {
  try {
    // Read the request body as text
    const bodyText = await req.text();

    // Parse the request body as JSON
    const requestBody = JSON.parse(bodyText);

    // Extract the interests property from the parsed body
    const { interests } = requestBody;

    // Check if interests is an array
    if (!Array.isArray(interests)) {
      throw new Error('Interests must be an array.');
    }

    // Delete existing user interests
    await sql`DELETE FROM person_skill_interests WHERE person_id = (SELECT id FROM PEOPLE WHERE name = ${user} LIMIT 1)`;

    // Insert new user interests into the database
    for (const interest of interests) {
      await sql`INSERT INTO person_skill_interests (person_id, skill_id) VALUES ((SELECT id FROM PEOPLE WHERE name = ${user} LIMIT 1), (SELECT id FROM SKILLS WHERE skill = ${interest} LIMIT 1))`;
    }

    // Send a success response
    return NextResponse.json({ success: true, message: 'User interests saved successfully.' });
  } catch (error) {
    console.error('Error saving user interests:', error);
    // Send an error response if an error occurs
    return NextResponse.error();
  }
};
