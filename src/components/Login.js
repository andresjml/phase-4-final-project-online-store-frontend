import React,{useState} from 'react'
import {BASE_URL} from '../constraints/index'


function Login({onLogin}) {
    const [username, setUsername] = useState("")
    const [toggle, setToggle]=useState(false)
    const [newUser, setNewUser]=useState({   
        username:"",
        address:"",
        phone:"",
        first_name:"",
        last_name:""
    })
    const [errors, setErrors] = useState(null)
    const [errorSignUp, setErrorSignUp]=useState(null)




    
    //lOGIN
    function handleSubmit(e) {
        e.preventDefault();
        fetch(BASE_URL+"/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
        })
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => onLogin(resp));
          }else {
            response.json().then((errorData) => setErrors(errorData));
          }
        })
    }

    
    //UPDATED FORM
    function handleInputChange(event) {
        setNewUser({
            ...newUser, 
            [event.target.name]:event.target.value
        })
        
    }

    //CREATE A NEW USER
    function handleSignupClick(){
        setToggle(!toggle)
    }
    function handleNewUserSubmit(e) {
        e.preventDefault();                

        fetch(BASE_URL+"/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        })
        .then((response) => {
            if (response.ok) {
            response.json().then((resp) => onLogin(resp));
          }else {
            response.json().then((errorData) => setErrorSignUp(errorData.errors));
          }
        })
    }


    


    return (
        <div className='container'>
            <div className='row'>
                <div className ='col'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <button className='btn btn-dark' type="submit">Login</button>
                    </form>
                    {
                        errors && (

                            <div class="alert alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Wait!</strong> The username is incorrect
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setErrors(null)}></button>
                            </div>
                            
                        )
                    }
                </div>
                <div className="col">
                    <h3>New user?</h3>
                    <button type="submit" className='btn btn-dark' onClick={handleSignupClick}>Signup</button>  
                    {toggle&&(
                        <>
                            <form onSubmit={handleNewUserSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Username</span>
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name="username" value={newUser.username} onChange={handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Address</span>
                                    <input type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="basic-addon1" name="address" value={newUser.address}onChange={handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Phone</span>
                                    <input type="text" className="form-control" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1" name="phone" value={newUser.phone}onChange={handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">First Name</span>
                                    <input type="text" className="form-control" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1" name="first_name" value={newUser.first_name} onChange={handleInputChange}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Last Name</span>
                                    <input type="text" className="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="basic-addon1" name="last_name" value={newUser.last_name} onChange={handleInputChange}/>
                                </div>
                                <button className='btn btn-dark' type="submit">Login</button>
                            </form>
                            {
                               errorSignUp && (

                                    <div class="alert alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Wait!</strong> Username/Address/Phone/First and Last Name can't be blank
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setErrorSignUp(null)}></button>
                                    </div>
                                    
                                )
                            }
                        </>
                    )}
                </div>
            </div>
            <h1 className='display-1 text-center'>ONLINE</h1>
            <div class="text-center">
                <img src="https://images.unsplash.com/photo-1604066867775-43f48e3957d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80" class="img-fluid rounded mx-auto d-block" alt="Login"></img>   
            </div>
        </div>
    )
}

export default Login