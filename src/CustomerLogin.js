import React, { useState } from 'react';
import './customerLogin.css';
import { useNavigate } from 'react-router-dom';
import { db } from './FirebaseConfig';
import { get, ref } from 'firebase/database';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userid = formData.userid;
    const password = formData.password;

    const userRef = ref(db, `Subscriber/${userid}`);
    const userSnap = await get(userRef);

    if(userSnap.exists()){
      const pass = userSnap.child("pass").val();
      if(pass === password){
        localStorage.setItem('userid', userid);
        navigate('/LandingPage');
      }else{
        alert('Password Not Matched');
      }
      
    }else{
      alert('UserId Not Found!')
    }
    

    

    
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userid">User ID</label>
            <input
              type="text"
              id="userid"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="additional-options">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
