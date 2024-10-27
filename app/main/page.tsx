"use client";

import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import CreateDbButton from './CreateDbButton';
import CreateTbButton from './createTable/CreateTbButton'; // Import the CreateTbButton

const Main = () => {
    const [databases, setDatabases] = useState<string[]>([]);
    const [tables, setTables] = useState<string[]>([]);
    const [selectedDb, setSelectedDb] = useState<string | null>(null);
    const [showCreateTableForm, setShowCreateTableForm] = useState(false); // State to control visibility

    // Fetch databases on component mount
    const fetchDatabases = async () => {
        try {
            const response = await fetch('/api/querygenerator/show/db');
            if (!response.ok) {
                throw new Error(`Failed to fetch databases: ${response.statusText}`);
            }
            const data = await response.json();
            setDatabases(data.databases);
        } catch (error) {
            console.error('Error fetching databases:', error);
        }
    };

    // Fetch tables for the selected database
    const fetchTables = async (dbname: string) => {
        try {
            const response = await fetch(`/api/querygenerator/show/table?dbname=${encodeURIComponent(dbname)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch tables: ${errorData.error || response.statusText}`);
            }
            const data = await response.json();
            setTables(data); // Assuming data is an array of table names
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    // Refresh list of databases when the component mounts
    useEffect(() => {
        fetchDatabases();
    }, []);

    const handleDatabaseClick = (dbName: string) => {
        setSelectedDb(dbName);
        fetchTables(dbName); // Fetch tables when a database is selected
    };

    const handleCreateTableClick = () => {
        setShowCreateTableForm((prev) => !prev); // Toggle form visibility
    };

    return (
        <div className={styles.wrapper}>
            <nav className={styles.mainNav}>
                <h1 className={styles.title}>EasyDB</h1>
                <div className={styles.navLinks}>
                    <a href="#" className={styles.username}>Username</a>
                    <a href="#" className={styles.editProfile}>Edit Profile</a>
                </div>
            </nav>

            <aside className={styles.mainSide}>
                <h2 className={styles.sideTitle}>Your Databases</h2>
                <CreateDbButton onDatabaseCreated={fetchDatabases} />
                <div className={styles.sideLinks}>
                    {databases.length > 0 ? (
                        databases.map((dbName, index) => (
                            <a 
                                key={index} 
                                href="#" 
                                className={styles.dbLinks} 
                                onClick={() => handleDatabaseClick(dbName)} // Fetch tables on click
                            >
                                {dbName}
                            </a>
                        ))
                    ) : (
                        <p>No databases available.</p>
                    )}
                </div>
            </aside>

            <main className={styles.mainBody}>
                <div className={styles.dbHeader}>
                    <div className={styles.dbTitleSection}>
                        <h2 className={styles.dbName}>{selectedDb || 'Select a Database'}</h2>
                        <button className={styles.editDbButton}>Edit</button>
                    </div>
                    <button 
                        className={styles.createTableButton} 
                        onClick={handleCreateTableClick} // Handle button click
                    >
                        Create New Table
                    </button>
                </div>

                {showCreateTableForm && ( // Conditionally render CreateTbButton
                    <div className={styles.createTableSection}>
                        <CreateTbButton />
                    </div>
                )}

                <div className={styles.tableList}>
                    {tables.length > 0 ? (
                        tables.map((tableName, index) => (
                            <div key={index} className={styles.tableBox}>
                                <span className={styles.tableName}>{tableName}</span>
                                <button className={styles.editTableButton}>Edit</button>
                            </div>
                        ))
                    ) : (
                        <p>No tables available in this database.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Main;
