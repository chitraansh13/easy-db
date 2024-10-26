import Image from 'next/image'
import Link from 'next/link' 
import React from 'react'
import styles from './landing.module.css'

const Landing = async () => {
    return (
        <div className={styles.landingMain}>
            <div className={styles.landingNav}>
                <h1 className={styles.title}>EasyDB</h1>
                <div className={styles.navLinks}>
                    <a href='/login' className={styles.loginLink}>Login</a>
                    <a href='/register' className={styles.registerLink}>Register</a>
                </div>
            </div>
            <div className={styles.landingBody}>
                <h1 className={styles.tagline1}>The New Standard For</h1>
                <h1 className={styles.tagline2}>DataBase Management</h1>
                <p className={styles.phrase}>Save hours in backend complexity and empower your team with our all-in-one database management platform, built to simplify every task from schema design to query execution.</p>
                <a href='/login' className={styles.getStarted}>Get Started</a>
                <Image
                  src="/landing/landing_img.png"
                  alt="Description of the image"
                  width={750}
                  height={300}
                />
            </div>
        </div>
    )
}

export default Landing
