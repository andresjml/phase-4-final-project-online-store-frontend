import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>React App</div>
      <NavBar />
      <Switch>
        <Route exact path='/'><Home/></Route>
      </Switch>
    </Router>
  );
}

export default App;
