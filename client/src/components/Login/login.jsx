import styles from './login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'akshit' && password === '1234') {
      alert('Logged in successfully');
      navigate('/whatsapp');
    } else {
      alert('Invalid credentials');
    };
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
