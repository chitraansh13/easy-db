import React from 'react';
import styles from './main.module.css';

const CreateDbButton = () => {
    const handleCreateDb = async () => {
        const dbname = prompt("Enter the database name:");
        if (!dbname) {
            alert("Database name is required!");
            return;
        }

        try {
            const response = await fetch('/api/querygenerator/create/db/route.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dbname }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`SQL Query: ${data.query}`);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert('Error creating database: ' + errorMessage);
        }
    };

    return (
        <button
            className={styles.createdb}
            onClick={handleCreateDb}
        >
            Create New
        </button>
    );
};

export default CreateDbButton;
