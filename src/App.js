import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from '../src/components/Home'
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
