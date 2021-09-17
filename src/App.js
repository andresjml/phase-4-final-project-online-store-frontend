import React,{useState, useEffect} from 'react'
import {BASE_URL} from '../src/constraints/index'
import NavBar from "./components/NavBar";
import {Switch, Route} from "react-router-dom";
import Home from '../src/components/Home'
import Login from "./components/Login";
import OrderContainer from "../src/components/OrderContainer"
import ProductContainer from './components/ProductContainer';
import NewOrder from './components/NewOrder';

function App() {
  const [user, setUser] = useState(null)
  const[newOrderId, setNewOrderId]=useState()
  const [updateOrder, setUpdateOrder]=useState(null)
  
  //FIND SESSION[:USER_ID] IN THE BACKEND
  
  useEffect(() => {
    fetch(BASE_URL+"/me")
      .then((response) => {
        if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

 

  //CREATE A NEW ORDER (TO PASS NEW ORDER ID TO NEW ORDER COMPONENT)
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

  //UPDATING ORDER TO SEND BACK TO NEWORDER
  function onAdd(addedItem){
    fetch(BASE_URL +`/users/${user.id}/orders/${addedItem.order_id}`)
      .then(res => res.json())
      .then(setUpdateOrder);
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
            <OrderContainer user={user} onClickNewOrder={onClickNewOrder} />
          </Route>
          <Route  path='/products'>
            <ProductContainer onClickNewOrder={onClickNewOrder} />
          </Route>
          <Route  path='/new_order'>
            <NewOrder order={newOrderId} onAdd={onAdd} />
          </Route>
          
          
        </Switch>      
      </>
    );
  } else {
    return (
      <>
      <Login onLogin={setUser} /> 
      </>  
        );
  }
}

  


export default App;
