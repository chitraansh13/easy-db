// Example of a simple login handler (backend)
// app/api/user-db/login/route.ts
import { NextResponse } from 'next/server';
import { mainPool } from '../../../lib/db'; // Use mainPool for user database queries
import bcrypt from 'bcryptjs';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as LoginRequest;
    const { email, password } = body;

    // Query to find the user by email
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await mainPool.query(query, [email]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const user = rows[0];

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    // Successful login
    return NextResponse.json({ message: "Login successful." }, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Error logging in." }, { status: 500 });
  }
}
