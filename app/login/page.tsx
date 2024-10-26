"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const router = useRouter(); // Initialize useRouter

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

        // Reset error message before submitting
        setErrorMessage('');

        // Send POST request to the backend for login
        try {
            const response = await fetch('/api/user-db/login', { // Correct API path for login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send email and password
            });

            if (response.ok) {
                // Redirect to the main page upon successful login
                router.push('/main');
            } else {
                const data = await response.json();
                // If the response contains an error message, set it
                if (data.message) {
                    setErrorMessage(data.message); // Set the error message
                }
            }
        } catch (error) {
            setErrorMessage('Error logging in.'); // Set a generic error message
        }
    };

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginSection}>
                <h1>Log in to your account.</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            required
                        />
                        <br />
                    </div>
                    <button type="submit">Login</button>
                    <br /><br />
                    {/* Display error message if it exists */}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </form>
                <a href="/register">New? Register here.</a>
            </div>
        </div>
    );
};

export default LoginPage;
