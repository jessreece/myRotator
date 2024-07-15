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
    const { rotation } = requestBody;
    
    await sql`UPDATE people SET open_to_rotate_teams = ${rotation} WHERE name = ${user}`;

    // Send a success response
    return NextResponse.json({ success: true, message: 'User rotation saved successfully.' });
  }
  catch (error) {
    console.error('Error saving user rotation:', error);
    return NextResponse.error();
  }
}