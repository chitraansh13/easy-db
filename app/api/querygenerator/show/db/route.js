import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const query = `SELECT datname FROM pg_database WHERE datistemplate = false;`;

        return NextResponse.json(
            { message: 'SQL query generated successfully', query },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error generating SQL query:', error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}