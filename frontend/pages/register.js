// pages/register.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      login(data);
    } else {
      alert(data.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <br />
        <input name="image" placeholder="Profile Image URL" value={formData.image} onChange={handleChange} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
