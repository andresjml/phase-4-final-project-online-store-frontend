import React from 'react'
import {Link} from "react-router-dom";

function Signup() {
    return (
        <div>
        <h1>Signup</h1>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link> 
        </div>
    )
}

export default Signup
