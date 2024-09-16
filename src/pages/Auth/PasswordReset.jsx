import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // Update password
      try {
        const response = await axios.post(`/api/reset-password/${token}`, { password });
        setSuccess('Password updated successfully!');
      } catch (error) {
        setError('Error updating password');
      }
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <div className="password-reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Reset Password</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default PasswordReset;