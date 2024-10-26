// app/api/querygenerator/create/db/route.ts
import { NextResponse } from 'next/server';
import { adminPool } from '../../../../lib/db'; // Ensure this imports the correct connection pool

export async function POST(req: Request) {
    try {
        const { dbname, execute } = await req.json();

        if (!dbname) {
            throw new Error('Invalid input: dbname is required.');
        }

        const query = `CREATE DATABASE ${dbname};`;
        
        if (execute) {
            // Run the query to create the database
            await adminPool.query(query);
            return NextResponse.json(
                { message: 'Database created successfully' },
                { status: 200 }
            );
        }

        // Return the SQL query without executing
        return NextResponse.json(
            { message: 'SQL query generated successfully', query },
            { status: 200 }
        );

    } catch (error) {
        // Check if the error is an instance of Error
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        console.error('Error processing request:', errorMessage);
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 400 }
        );
    }
}
