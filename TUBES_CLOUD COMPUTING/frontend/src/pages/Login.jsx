import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.56.11:3000/api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      if (res.data.success) {
        onLogin(res.data.user);
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="glass-panel" style={{ width: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login to EduGrade</h2>
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Username (e.g., admin)" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="input-field" 
            placeholder="Password (e.g., admin123)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
