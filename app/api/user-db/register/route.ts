// app/api/user-db/register/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RegisterRequest;
    const { username, email, password } = body;
    
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
    await pool.query(query, [username, email, password]);
    
    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { message: "Error registering user." },
      { status: 500 }
    );
  }
}