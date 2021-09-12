import React,{useState, useEffect} from 'react'
import {BASE_URL} from '../src/constraints/index'
import NavBar from "./components/NavBar";
import {Switch, Route} from "react-router-dom";
import Home from '../src/components/Home'
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(BASE_URL+"/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (user) {
    return (
      <>
      <h2>Welcome, {user.username}!</h2>
      
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path= '/signup'>
            <Signup/>
          </Route>
  
        </Switch>
      
      </>
    );
  } else {
    return <Login onLogin={setUser} />;
  }
}

  


export default App;
