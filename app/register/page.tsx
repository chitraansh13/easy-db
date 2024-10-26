"use client"; // This is a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

        // Reset error message before submitting
        setErrorMessage('');

        // Send POST request to the backend
        try {
            const response = await fetch('/api/user-db/register', { // Correct API path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                // Reset form fields
                setUsername('');
                setEmail('');
                setPassword('');
                
                // Navigate to the /main page
                router.push('/main');
            } else {
                const data = await response.json();
                // If the response contains an error message, set it
                if (data.message) {
                    setErrorMessage(data.message); // Set the error message
                }
            }
        } catch (error) {
            setErrorMessage('Error registering user.'); // Set a generic error message
        }
    };

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginSection}>
                <h1>Create an account.</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter your Name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required // Mark as required
                        />
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <input
                            type="password"
                            placeholder='Set a Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit">Create</button>
                    {/* Display error message if it exists */}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
