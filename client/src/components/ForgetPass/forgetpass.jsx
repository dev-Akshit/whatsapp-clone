import React, { useState } from 'react'
import styles from './forgetpass.module.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgetPass() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forget-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success('Password reset link sent to your email');
                setEmail(''); // Clear the input field
            } else {
                toast.error(data.message || 'Failed to send reset link');
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
            toast.error('Server error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.resetForm}>
                <h2 className={styles.heading}>Reset Password</h2>
                <p className={styles.subHeading}>Enter your email to receive a password reset link</p>
                
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                    required
                />
                
                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                <p className={styles.loginLink} onClick={() => navigate("/login")}>
                    Back to Login
                </p>
            </form>
        </div>
    )
}
