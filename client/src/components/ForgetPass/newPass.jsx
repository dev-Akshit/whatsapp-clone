import React, { useState } from 'react';
import styles from './forgetPass.module.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function NewPass() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams(); // Get token from URL params

    if (!token) {
        toast.error("Invalid or missing reset token");
        return (
            <div className={styles.container}>
                <div className={styles.resetForm}>
                    <h2 className={styles.heading}>Invalid Reset Link</h2>
                    <p>The password reset link is invalid or has expired.</p>
                    <button 
                        onClick={() => navigate('/forget-password')} 
                        className={styles.submitButton}
                    >
                        Request New Link
                    </button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
                
        setIsLoading(true);
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success('Password changed successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error('Server error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.resetForm}>
                <h2 className={styles.heading}>Set New Password</h2>
                
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                    required
                />
                
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.inputField}
                    required
                />
                
                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Change Password'}
                </button>
            </form>
        </div>
    )
}
