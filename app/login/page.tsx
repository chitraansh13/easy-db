import React from 'react'
import styles from './LoginPage.module.css'


const LoginPage = async () => {

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginSection}>
                <h1>Log in to your account.</h1>
                <input type="text" placeholder='Email' />
                <br />
                <input type="text" placeholder='Password'/>
                <br />
                <button>Login</button>
                <br />
                <a href="">New? Register here.</a>
            </div>
        </div>
    )
}

export default LoginPage