import './App.css';
import Navbar from './Components/Navbar';
import Contact from './Components/contacts/Contact';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import AuthVerify from './common/AuthVerify';
import UpdateContact from './Components/contacts/UpdateContact';
import { logout } from './redux/users';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  
  const logOut = () => {
    this.props.history.push("/login");
    dispatch(logout());
  }

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
          <Route exact path="/update/:id">
            <UpdateContact />
          </Route>
        </Switch>
        <div>
          <AuthVerify logOut={logOut} />
        </div>
    </Router>
  );
}

export default App;
