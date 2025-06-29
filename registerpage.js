import React,{useState,useContext} from "react";
import {Themecontext} from '../contxts/Themecontext';

const Registerpage=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [error,setError]=useState('');
    const [theme]=useContext(Themecontext);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');

        if(!name||!email||!password||!confirmPassword){
            setError('All fields are required.');
            return;
        }
        if (password!==confirmPassword){
            setError('Passwords do not match.');
            return;
        }
        if (password.length<8){
            setError('Password must be at least 8characters long.');
            return;
        }
        try{
            const response=await fetch('api/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,email,password}),
            });
            const data=await response.json();

            if (response.ok){
                console.log('Registration successful:',data);
                alert('Registration successful!Please login.');
            }else{
                setError(data.message||'Registration failed.Please try again.');
            }
            console.log('Register attempt with:',{name,email,password});
            alert('Registration successful!(Mock)');
        }catch(err){
            setError('An unexpected error occured.Please try again later.');
            console.error('Registration error:',err);
        }
    };

    return(
       <div className={'register-container ${theme}'}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='confirmpassword'>Confirm Password:</label>
                    <input
                    type='password'
                    id='confirmpassword'
                    value={confirmpassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}required
                    />
                </div>
                {error &&<p className='error-message'>{error}</p>}
                <button type='submit'>Register</button>
            </form>
            <p>Already have an account?<a href="/login">Login here</a></p>
            </div>
    );
};
export default Registerpage;