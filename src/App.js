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
  const[newOrderId, setNewOrderId]=useState(null)
  
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

console.log(newOrderId)

  

  if (user) {
    return (
      <>            
        <NavBar onLogout={setUser} user={user}/>
        <Switch>
          <Route exact path='/'>
            <Home user={user} />
          </Route>
          <Route  path='/orders'>
            <OrderContainer user={user} onClickNewOrder={onClickNewOrder} />
          </Route>
          <Route  path='/products'>
            <ProductContainer />
          </Route>
          <Route  path='/new_order'>
            <NewOrder order={newOrderId} />
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
