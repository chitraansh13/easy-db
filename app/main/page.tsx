"use client";

import React, { useEffect, useState } from 'react';
import styles from './main.module.css';
import CreateDbButton from './CreateDbButton';

const Main = () => {
    const [databases, setDatabases] = useState<string[]>([]);

    // Fetch databases
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

    // Refresh list when the component mounts
    useEffect(() => {
        fetchDatabases();
    }, []);

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
                            <a key={index} href="#" className={styles.dbLinks}>
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
                        <h2 className={styles.dbName}>Database Name</h2>
                        <button className={styles.editDbButton}>Edit</button>
                    </div>
                    <button className={styles.createTableButton}>Create New Table</button>
                </div>

                <div className={styles.tableList}>
                    {['Users Table', 'Products Table', 'Orders Table', 'Categories Table'].map((tableName, index) => (
                        <div key={index} className={styles.tableBox}>
                            <span className={styles.tableName}>{tableName}</span>
                            <button className={styles.editTableButton}>Edit</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Main;
