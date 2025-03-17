import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './login.module.css';
import toast from 'react-hot-toast';

function LoginPage({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
      
      if (response.ok) {
        // Get the user data including ID
        const userData = await response.json();
        
        // Set authentication state
        setIsAuthenticated(true);
        
        // Connect to socket and emit userOnline event
        const socket = io("http://localhost:5000", { withCredentials: true });
        
        if (userData && userData._id) {
          socket.emit("userOnline", userData._id);
          console.log("Emitted userOnline with ID:", userData._id);
        }
        
        navigate("/");
        toast.success("Login successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('Connection error. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.heading}>Login Page</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
          required
        />
        <input type="submit" value="Submit" className={styles.submitButton} />
        <p onClick={() => navigate("/forget-password")} className={styles.loginLink}>Forget Password?</p>
        <p onClick={() => navigate("/signup")} className={styles.loginLink}>SignUp</p>
      </form>
    </div>
  );
}

export default LoginPage;