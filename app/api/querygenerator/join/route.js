import { NextResponse } from 'next/server';
import isValidName from '../../../utils/validateName';

export async function POST(req) {
    try {
        const { table1, table2, joinType, joinCondition } = await req.json();

        if (!table1 || !table2 || !joinType) {
            throw new Error('Missing required parameters');
        }

        if (!isValidName(table1) || !isValidName(table2)) {
            throw new Error('Invalid table name');
        }

        const validJoinTypes = ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN'];
        if (!validJoinTypes.includes(joinType.toUpperCase())) {
            throw new Error('Invalid join type');
        }

        let query;
        if (joinType.toUpperCase() === 'CROSS JOIN') {
            query = `SELECT * FROM ${table1} ${joinType.toUpperCase()} ${table2}`;
        } else {
            if (!joinCondition) {
                throw new Error('Missing join condition for the specified join type');
            }

            // Exclude SerialNo from the SELECT statement
            query = `
                SELECT 
                    ${table1}.*, 
                    ${table2}.* 
                FROM ${table1} 
                ${joinType.toUpperCase()} ${table2} 
                ON ${joinCondition}
                WHERE ${table1}.SerialNo IS NULL AND ${table2}.SerialNo IS NULL
            `;
        }

        return NextResponse.json({ query }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}