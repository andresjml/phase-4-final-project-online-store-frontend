import React,{useState} from 'react'
import {BASE_URL} from '../constraints/index'


function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [toggle, setToggle]=useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        fetch(BASE_URL+"/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
        })
        .then((r) => r.json())
        .then((user) => onLogin(user));
    }


    function handleSignupClick(){
        setToggle(!toggle)
    }


    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button type="submit">Login</button>
            </form>   

            <h3>New user?</h3>
            <button type="submit" onClick={handleSignupClick}>Signup</button>  
            {toggle&&(
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Username</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Address</span>
                        <input type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Phone</span>
                        <input type="text" className="form-control" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">First Name</span>
                        <input type="text" className="form-control" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Last Name</span>
                        <input type="text" className="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
        </>
    )
}

export default Login