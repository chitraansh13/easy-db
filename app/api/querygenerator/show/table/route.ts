// app/api/querygenerator/show/table/route.ts
import { NextResponse } from 'next/server';
import isValidName from '@/utils/validateName';
import { createDbPool } from '../../../../lib/db'; // Adjust this import

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const databaseName = searchParams.get('dbname');

    if (!databaseName || !isValidName(databaseName)) {
        return NextResponse.json(
            { error: 'Invalid or missing database name.' },
            { status: 400 }
        );
    }

    try {
        // Create a new pool for the specified database
        const dbPool = createDbPool(databaseName);

        const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_catalog = $1;`;
        const { rows } = await dbPool.query(query, [databaseName]);

        return NextResponse.json(
            rows.map(row => row.table_name), // Returning just the table names
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error fetching tables:', error.message);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
