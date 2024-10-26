import React from 'react'
import styles from './RegisterPage.module.css'


const RegisterPage = async () => {

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginSection}>
                <h1>Create an account.</h1>
                <div>
                    <input type="text" placeholder='Enter your Name' />   
                    <input type="text" placeholder='Email'/>
                    <input type="password" placeholder='Set a Password'/>
                </div>
                <button>Create</button>
            </div>
        </div>
    )
}

export default RegisterPage