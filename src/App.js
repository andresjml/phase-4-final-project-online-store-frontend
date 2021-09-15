import React,{useState, useEffect} from 'react'
import {BASE_URL} from '../src/constraints/index'
import NavBar from "./components/NavBar";
import {Switch, Route} from "react-router-dom";
import Home from '../src/components/Home'
import Login from "./components/Login";
import Signup from "./components/Signup";
import OrderContainer from "../src/components/OrderContainer"
import ProductContainer from './components/ProductContainer';
import NewOrder from './components/NewOrder';

function App() {
  const [user, setUser] = useState(null)
  const[newOrderId, setNewOrderId]=useState()
  
  console.log(user)
  useEffect(() => {
    fetch(BASE_URL+"/me")
      .then((response) => {
        if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user)

  function onClickNewOrder(){
    fetch(BASE_URL +`/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id: user.id, paid:false}),
    })
      .then(res => res.json())
      .then(setNewOrderId);  
    
  }    
  

  

  if (user) {
    return (
      <>
      <h2>Welcome, {user.username}!</h2>      
        <NavBar onLogout={setUser}/>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route  path='/orders'>
            <OrderContainer user={user} onClickNewOrder={onClickNewOrder}/>
          </Route>
          <Route  path='/products'>
            <ProductContainer onClickNewOrder={onClickNewOrder} />
          </Route>
          <Route  path='/new_order'>
            <NewOrder user={user} order={newOrderId} />
          </Route>
          
          
        </Switch>      
      </>
    );
  } else {
    return (
      <>
        <Login onLogin={setUser} />
          <Switch> 
            <Route path= '/signup'>
              <Signup/>
            </Route>  
          </Switch> 

      </>  
        );
  }
}

  


export default App;
