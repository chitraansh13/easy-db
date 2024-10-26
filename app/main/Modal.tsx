"use client";

import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    query: string;
    onRunQuery: () => Promise<void>; // Updated to return a Promise
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, query, onRunQuery }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>SQL Query</h2>
                <pre>{query}</pre>
                <button onClick={onRunQuery} className={styles.runButton}>
                    Run Query
                </button>
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
