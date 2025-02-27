import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //api
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('User registered successfully');
      navigate('/login');
    } else {
      alert(data.msg || 'Failed to register user');
    }
      
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.heading}>Signup Page</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <p onClick={() => { navigate('/login') }} className={styles.signupLink}>Login</p>
      </form>
    </div>
  );
}

export default SignupPage;
