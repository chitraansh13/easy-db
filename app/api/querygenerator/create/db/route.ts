// app/api/querygenerator/create/db/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { dbname } = await req.json();

        if (!dbname) {
            throw new Error('Invalid input: dbname is required.');
        }

        const query = `CREATE DATABASE ${dbname};`;

        return NextResponse.json(
            { message: 'SQL query generated successfully', query },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error generating SQL query:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 400 }
        );
    }
}
