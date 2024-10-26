import React from 'react'
import styles from './LoginPage.module.css'


const LoginPage = async () => {

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginSection}>
                <h1>Log in to your account.</h1>
                <div>
                    <input type="text" placeholder='Email' />
                    <br />
                    <input type="password" placeholder='Password'/>
                    <br />
                </div>
                <button>Login</button>
                <br /><br />
                <a href="/register">New? Register here.</a>
            </div>
        </div>
    )
}

export default LoginPage