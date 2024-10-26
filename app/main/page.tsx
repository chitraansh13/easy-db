import React from 'react'
import styles from './main.module.css'

const Main = async () => {
    return (
        <div>
            <div className={styles.mainNav}>
                <h1 className={styles.title}>EasyDB</h1>
                <div className={styles.navLinks}>
                    <a href='/login' className={styles.loginLink}>Login</a>
                    <a href='/register' className={styles.registerLink}>Register</a>
                </div>
            </div>
            <div className={styles.mainSide}>
                <h1 className={styles.title}>Your Databases</h1>
                <button className={styles.createdb}>Create New</button>
                <div className={styles.navLinks}>
                    <a href='/login' className={styles.loginLink}>Database 1</a>
                    <a href='/register' className={styles.registerLink}>Database 2</a>
                    <a href='/register' className={styles.registerLink}>Database 3</a>
                    <a href='/register' className={styles.registerLink}>Database 4</a>
                </div>
            </div>

            <div className={styles.mainBody}>

            </div>
        </div>
    )
}

export default Main
