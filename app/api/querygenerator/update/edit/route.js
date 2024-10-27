//done ig

import { NextResponse } from 'next/server';
import isValidName from '../../../../../utils/validateName';

export async function POST(req) {
    try {
        const { tablename, column, newValue, serialNo } = await req.json();

        if (!tablename || !column || newValue === undefined || serialNo === undefined) {
            throw new Error('Invalid input: tablename, column, newValue, and serialNo are required.');
        }

        if (!isValidName(tablename) || !isValidName(column)) {
            throw new Error('Invalid table name or column name');
        }

        
        let query = `UPDATE ${tablename} SET ${column} = `;
        if (typeof newValue === 'string') {
            query += `'${newValue}'`;
        } else {
            query += newValue;
        }

        
        query += ` WHERE "SerialNo" = ${serialNo};`;

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