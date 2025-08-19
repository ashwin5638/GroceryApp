import { useState } from 'react';
import './index.css';

const Register = () => {
  const [RegisterData, setRegisterData] = useState({
    firstName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!RegisterData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!RegisterData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(RegisterData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!RegisterData.password) {
      newErrors.password = 'Password is required';
    } else if (RegisterData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    
      const response = await fetch('http://localhost:3000/Users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: RegisterData.firstName,
          emailAddress: RegisterData.email,
          phoneNumber: RegisterData.phone,
          Password: RegisterData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful:', data);
      } else {
        setErrors({ general: data.message || 'Registration failed' });
      }
    
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Create Account</h2>
        <p className="register-subtitle">Join us and start shopping today!</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={RegisterData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="input-field"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={RegisterData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={RegisterData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
           
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={RegisterData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
             
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" name="agreeTerms" required />
              <span className="checkmark"></span>
              I agree to the <a href="/terms">Terms and Conditions</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="login-link">
            Already have an account? <a href="/login">Sign in here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
