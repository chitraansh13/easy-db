import React from 'react'
import styles from './main.module.css'

const Main = async () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainNav}>
                <h1 className={styles.title}>EasyDB</h1>
                <div className={styles.navLinks}>
                    <a href='/login' className={styles.username}>Username</a>
                    <a href='/register' className={styles.editProfile}>Edit Profile</a>
                </div>
            </div>
            <div className={styles.mainSide}>
                <h1 className={styles.sideTitle}>Your Databases</h1>
                <button className={styles.createdb}>Create New</button>
                <div className={styles.sideLinks}>
                    <a href='/login' className={styles.dbLinks}>Database 1</a>
                    <a href='/register' className={styles.dbLinks}>Database 2</a>
                    <a href='/register' className={styles.dbLinks}>Database 3</a>
                    <a href='/register' className={styles.dbLinks}>Database 4</a>
                </div>
            </div>

            <div className={styles.mainBody}>
                <div className={styles.dbHeader}>
                    <div className={styles.dbTitleSection}>
                        <h1 className={styles.dbName}>Database Name</h1>
                        <button className={styles.editDbButton}>Edit</button>
                    </div>
                    <button className={styles.createTableButton}>Create New Table</button>
                </div>

                <div className={styles.tableList}>
                    {['Users Table', 'Products Table', 'Orders Table', 'Categories Table'].map((tableName, index) => (
                        <div key={index} className={styles.tableBox}>
                            <a href={`/table/${index}`} className={styles.tableName}>{tableName}</a>
                            <button className={styles.editTableButton}>Edit</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Main