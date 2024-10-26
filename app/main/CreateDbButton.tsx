"use client";

import React, { useState } from 'react';
import styles from './main.module.css';
import Modal from './Modal';

const CreateDbButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [dbname, setDbname] = useState('');

    // Function to create a new database
    const handleCreateDb = async () => {
        const dbNameInput = prompt("Enter the database name:");
        if (!dbNameInput) {
            alert("Database name is required!");
            return;
        }

        setDbname(dbNameInput); // Store the database name for later execution

        try {
            const response = await fetch('/api/querygenerator/create/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dbname: dbNameInput }),
            });

            const data = await response.json();
            if (response.ok) {
                setQuery(data.query); // Set the generated query
                setIsModalOpen(true);  // Open the modal to show the query
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert('Error creating database: ' + errorMessage);
        }
    };

    // Function to run the generated SQL query
    const handleRunQuery = async () => {
        try {
            const response = await fetch('/api/querygenerator/create/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dbname, execute: true }), // Send execute flag
            });

            const data = await response.json();
            if (response.ok) {
                alert('Database created successfully');
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert('Error running query: ' + errorMessage);
        } finally {
            setIsModalOpen(false); // Close modal after running the query
        }
    };

    return (
        <>
            <button
                className={styles.createdb}
                onClick={handleCreateDb}
            >
                Create New
            </button>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                query={query}
                onRunQuery={handleRunQuery} 
            />
        </>
    );
};

export default CreateDbButton;
