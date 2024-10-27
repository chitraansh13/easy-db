// app/main/CreateTbButton.tsx
'use client';

import { useState } from 'react';
import styles from '../main.module.css';
import Modal from '../Modal'; // Import your Modal component

const DATA_TYPES = [
    'CHAR',
    'VARCHAR',
    'TEXT',
    'BOOLEAN',
    'INT',
    'FLOAT',
    'DATE',
    'DATETIME'
] as const;

interface ColumnConstraints {
    primary_key: boolean;
    not_null: boolean;
    unique: boolean;
    default: string;
}

interface ColumnDefinition {
    name: string;
    datatype: typeof DATA_TYPES[number]; // Ensure datatype is one of the DATA_TYPES
    constraints: ColumnConstraints;
}

type ConstraintKey = keyof ColumnConstraints;
type ColumnKey = keyof ColumnDefinition;

export default function CreateTbButton() {
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState<ColumnDefinition[]>([{
        name: '',
        datatype: DATA_TYPES[0],
        constraints: {
            primary_key: false,
            not_null: false,
            unique: false,
            default: ''
        }
    }]);

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [sqlQuery, setSqlQuery] = useState(''); // State to hold the SQL query

    const addColumn = () => {
        setColumns([...columns, {
            name: '',
            datatype: DATA_TYPES[0],
            constraints: {
                primary_key: false,
                not_null: false,
                unique: false,
                default: ''
            }
        }]);
    };

    const removeColumn = (index: number) => {
        if (columns.length > 1) {
            setColumns(columns.filter((_, i) => i !== index));
        }
    };

    const updateColumn = (index: number, field: string, value: string | boolean) => {
        const newColumns = [...columns];
        if (field.startsWith('constraints.')) {
            const constraintField = field.split('.')[1] as ConstraintKey;
            newColumns[index] = {
                ...newColumns[index],
                constraints: {
                    ...newColumns[index].constraints,
                    [constraintField]: value
                }
            };
        } else {
            newColumns[index] = {
                ...newColumns[index],
                [field as ColumnKey]: typeof value === 'string' ? value.toUpperCase() : value
            };
        }
        setColumns(newColumns);
    };

    const handleSubmit = async () => {
        try {
            console.log("Sending request to create table");

            const response = await fetch('/api/querygenerator/create/table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tablename: tableName.toUpperCase(),
                    columns: columns,
                    databaseName: "yourSelectedDatabaseName" // Replace with dynamically fetched selected database name
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Table created successfully:", data);
                setSqlQuery(data.query); // Set the SQL query in state
                setIsModalOpen(true); // Open the modal
            } else {
                console.error("Error in response:", data);
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error creating table:", error);
            alert("Error creating table: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSqlQuery(''); // Reset SQL query when closing modal
    };

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label>TABLE NAME:</label>
                <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value.toUpperCase())}
                    className={styles.input}
                    placeholder="ENTER TABLE NAME"
                />
            </div>

            {columns.map((column, index) => (
                <div key={index} className={styles.columnContainer}>
                    <div className={styles.columnHeader}>
                        <h3>COLUMN {index + 1}</h3>
                        {columns.length > 1 && (
                            <button
                                onClick={() => removeColumn(index)}
                                className={styles.removeButton}
                            >
                                REMOVE
                            </button>
                        )}
                    </div>

                    <div className={styles.columnGrid}>
                        <div className={styles.formGroup}>
                            <label>COLUMN NAME:</label>
                            <input
                                type="text"
                                value={column.name}
                                onChange={(e) => updateColumn(index, 'name', e.target.value)}
                                className={styles.input}
                                placeholder="ENTER COLUMN NAME"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>DATA TYPE:</label>
                            <select
                                value={column.datatype}
                                onChange={(e) => updateColumn(index, 'datatype', e.target.value)}
                                className={styles.input}
                            >
                                {DATA_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={column.constraints.primary_key}
                                    onChange={(e) => updateColumn(index, 'constraints.primary_key', e.target.checked)}
                                />
                                PRIMARY KEY
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={column.constraints.not_null}
                                    onChange={(e) => updateColumn(index, 'constraints.not_null', e.target.checked)}
                                />
                                NOT NULL
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={column.constraints.unique}
                                    onChange={(e) => updateColumn(index, 'constraints.unique', e.target.checked)}
                                />
                                UNIQUE
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>DEFAULT VALUE:</label>
                            <input
                                type="text"
                                value={column.constraints.default}
                                onChange={(e) => updateColumn(index, 'constraints.default', e.target.value.toUpperCase())}
                                className={styles.input}
                                placeholder="ENTER DEFAULT VALUE"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.buttonContainer}>
                <button onClick={addColumn} className={styles.addButton}>
                    ADD COLUMN
                </button>
                <button onClick={handleSubmit} className={styles.createButton}>
                    CREATE TABLE
                </button>
            </div>

            {/* Render the Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                query={sqlQuery} // Pass the SQL query to the Modal
                onRunQuery={async () => {
                    // Add functionality to run the SQL query if needed
                }}
            />
        </div>
    );
}
