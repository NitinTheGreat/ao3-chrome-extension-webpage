import React, { useState } from 'react';
import "../css/SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
  
    try {
      console.log('Sending request to:', 'https://ao3-chrome-extension-backend.onrender.com/auth/register');
      console.log('Request body:', { username, email, password });
  
      const response = await fetch('https://ao3-chrome-extension-backend.onrender.com/auth/register', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          email,
          password,
        }),
      });
  
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok) {
        setMessage(data.message || 'Registration successful');
        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error details:', error);
      setMessage('An error occurred. Please try again.');
    }
  };


  return (
    <div className="page-border">
      <div className="page-container">
        <div className="image-container">
          {/* <img className="coverimg" src="../images/signup.png" alt="Cover Image" /> */}
          {/* <img className="logo-vector" src="../images/logo.png" alt="Logo" /> */}
          {/* SVG placeholder comments */}
          {/* Cover image SVG */}
          {/* Logo SVG */}
        </div>

        <div className="signup">
          <h1>SIGN UP</h1>
          <p>Join now to unlock exclusive tools and keep your AO3 fanfiction journey organized!</p>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <div className="input-fields">
                {/* SVG placeholder comment */}
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-box">
              <div className="input-fields">
                {/* SVG placeholder comment */}
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-box">
              <div className="input-fields">
                {/* SVG placeholder comment */}
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  {/* SVG placeholder comment */}
                </span>
              </div>
            </div>

            <div className="input-box">
              <div className="input-fields">
                {/* SVG placeholder comment */}
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                  {/* SVG placeholder comment */}
                </span>
              </div>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>

         

          <p className="login-link">Already have an account? <a href="#">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;