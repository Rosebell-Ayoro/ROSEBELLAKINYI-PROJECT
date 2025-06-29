import React from 'react';
import {link} from 'react-router-dom';
const Navbar=()=>(
   <nav style={{padding:'10px',background:'#f0f0f0'}}>
    <link to="/">Home</link> |{''}
    <link to="/">Dashboard</link>
    <link to="/lesson-plan">Lesson Plan</link> |{''}
    <link to="/scheme-of-work">Scheme Of Work</link> |{''}
    <link to="/record-of-work">Record Of Work</link> |{''}
    <link to="/feedback">Feedback</link> |{''}
    <link to="/login">Login</link> |{''}
    <link to="/register">Register</link>
   </nav>
);
export default Navbar;