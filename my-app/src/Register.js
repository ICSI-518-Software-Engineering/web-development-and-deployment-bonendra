import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        username,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        onLogin();
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration', error);
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
      <label style={{ marginBottom: '10px' }}>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
