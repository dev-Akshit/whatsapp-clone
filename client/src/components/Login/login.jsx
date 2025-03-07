import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import toast from 'react-hot-toast';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    if (response.ok) {
      navigate('/');
      toast.success("Login successful");
    } else {
      toast.error('Invalid credentials');
    }
  }
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <input type="submit" value="Submit" className={styles.submitButton} />
        <p onClick={() => navigate("/signup")} className={styles.loginLink} >SignUp</p>
      </form>

    </div>
  );
}

export default LoginPage;
