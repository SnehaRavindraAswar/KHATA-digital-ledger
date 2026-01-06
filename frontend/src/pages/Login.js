import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
  try {
    const res = await API.post('/admin/login', {
      username,
      password
    });

    setMessage(res.data.message);

    // ✅ Redirect after successful login
    navigate('/customers');

  } catch (err) {
    setMessage(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div style={styles.container}>
      <h2>KHATA – Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#2e86de',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Login;
