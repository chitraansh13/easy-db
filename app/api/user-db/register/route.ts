// app/api/user-db/register/route.ts
import { NextResponse } from 'next/server';
import { mainPool } from '../../../lib/db'; // Use mainPool for user registration
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RegisterRequest;
    const { username, email, password } = body;
    
    // Generate a random UUID
    const id = uuidv4();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert the user with the generated UUID
    const query = "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)";
    await mainPool.query(query, [id, username, email, hashedPassword]);
    
    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    
    // Check for duplicate email error
    if (error instanceof Error && error.message.includes('unique_email')) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Error registering user." },
      { status: 500 }
    );
  }
}
