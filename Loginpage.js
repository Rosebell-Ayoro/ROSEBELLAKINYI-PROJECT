import React,{useState,useContext} from 'react';
import {themecontext}from '../contexts/Themecontext';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = {
      token: 'abcd1234',
      user: { name: 'Rosebell', role: 'supervisor' }
    };

    setUserSession(response.token, response.user);

    const role = response.user.role;
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'student') navigate('/student/dashboard');
    else if (role === 'supervisor') navigate('/supervisor/dashboard');
  };

  return <button onClick={handleLogin}>Login</button>;
};

const LoginPage=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const {theme}=useContext(Themecontext);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
        if(!email||!password){
            setError('please enter both email and password.');
            return;
        }
        try{
            const response=await fetch('/api/login',{
                method:'POST',
                headers:{'content-Type':'application/json'},
                body:JSON.stringify({email,password}),
            });
            const data=await response.json();
            if (response.ok){
                console.log('Login successful:',data);
            }else{
                setError(data.message||'Login failed.Please try again.');
            }
            console.log('Login attempt with:',{email,password});
            alert('Login successful!(Mock)');
        }catch(err){
            setError('An unexpected error occured.please try again later.');
            console.error('Login error:',err);
        }
    };
    return(
        <div className={'login-container ${theme}'}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}required
                    />
                </div>
                {error &&<p className='error-message'>{error}</p>}
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account?<a href="/register">Register here</a></p>
        </div>
    );
};
export default LoginPage;