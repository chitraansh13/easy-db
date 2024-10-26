"use client";

import React, { useState } from 'react';
import styles from './main.module.css';
import Modal from './Modal';

interface CreateDbButtonProps {
    onDatabaseCreated: () => void;
}

const CreateDbButton: React.FC<CreateDbButtonProps> = ({ onDatabaseCreated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [dbname, setDbname] = useState('');

    const handleCreateDb = async () => {
        const dbNameInput = prompt("Enter the database name:");
        if (!dbNameInput) {
            alert("Database name is required!");
            return;
        }

        setDbname(dbNameInput);

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
                setQuery(data.query);
                setIsModalOpen(true);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error creating database:', error);
            alert('Error creating database');
        }
    };

    const handleRunQuery = async () => {
        try {
            const response = await fetch('/api/querygenerator/create/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dbname, execute: true }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Database created successfully');
                onDatabaseCreated(); // Refresh the database list
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error running query:', error);
            alert('Error running query');
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button className={styles.createdb} onClick={handleCreateDb}>
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
