import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email) {
      // Send password reset link to email
      try {
        const response = await axios.post('/api/forgot-password', { email });
        setSuccess('Password reset link sent to your email!');
      } catch (error) {
        setError('Error sending password reset link');
      }
    } else if (phone) {
      // Send OTP to phone
      try {
        const response = await axios.post('/api/forgot-password', { phone });
        setSuccess('OTP sent to your phone!');
      } catch (error) {
        setError('Error sending OTP');
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;