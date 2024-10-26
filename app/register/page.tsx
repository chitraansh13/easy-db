"use client"; // This is a client component

import React, { useState } from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

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
                alert('User registered successfully!');
                // Reset form fields
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error registering user.');
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
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
