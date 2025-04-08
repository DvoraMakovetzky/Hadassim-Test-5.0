import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './GlobalCss.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    first_name: '',
    last_name: '',
    password: ''
  });
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, loginData);
      const{role,user}=res.data.data;
      sessionStorage.setItem('user_id',user._id);
      sessionStorage.setItem('role',role);
      if(role==='vendor'){
        navigate('/orders');
      }else if(role==='owner'){
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Login to your account</h2>
      <div className="fields">
        <label>First Name</label>
        <InputText value={loginData.first_name} onChange={(e) => setLoginData({ ...loginData, first_name: e.target.value })} className="mb-3"/>

        <label>Last Name</label>
        <InputText value={loginData.last_name} onChange={(e) => setLoginData({ ...loginData, last_name: e.target.value })} className="mb-3"/>

        <label>Password</label>
        <Password value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} toggleMask className="mb-3"/>

        <Button label="Login" onClick={handleLogin} className="btn-form mb-3" />
      </div>
      <p className="link">
        Don't have an account? <Link to="/register" style={{ color: '#00bcd4' }}><strong>Sign up here</strong></Link>
      </p>
    </div>
  );
};

export default LoginForm;
