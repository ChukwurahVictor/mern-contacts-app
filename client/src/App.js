import './App.css';
import Navbar from './Components/Navbar';
import Contact from './Components/contacts/Contact';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Contact />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
