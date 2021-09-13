import React,{useState} from 'react'
import {BASE_URL} from '../constraints/index'
import {Link} from "react-router-dom";

function Login({onLogin}) {
    const [username, setUsername] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch(BASE_URL+"/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
        })
        .then((r) => r.json())
        .then((user) => onLogin(user));
    }
    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Login</button>
        </form>
        
        </>
    )
}

export default Login