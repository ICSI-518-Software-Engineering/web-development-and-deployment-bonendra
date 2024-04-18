import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        onLogin();
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <label style={{ marginBottom: '10px' }}>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label style={{ marginBottom: '10px' }}>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Login" />
      <button type="button" onClick={onRegister} style={{ marginTop: '10px' }}>Register</button>
    </form>
  );
};

export default Login;
