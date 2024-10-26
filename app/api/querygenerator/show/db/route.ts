// app/api/querygenerator/list/dbs/route.ts
import { NextResponse } from 'next/server';
import { adminPool } from '../../../../lib/db';

export async function GET() {
    try {
        const query = `SELECT datname FROM pg_database WHERE datistemplate = false;`;
        const result = await adminPool.query(query);
        
        const databases = result.rows.map((row: { datname: string }) => row.datname);

        return NextResponse.json({ databases }, { status: 200 });
    } catch (error) {
        console.error('Error fetching databases:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
