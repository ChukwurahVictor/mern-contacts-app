import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ContactsIcon from '@material-ui/icons/Contacts';

import { logout } from '../redux/users';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
   logo: {
      textAlign: 'center',
      alignContent: 'center',
   }
}));

const Navbar = () => {
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch()

  const [loggedIn, setLoggedIn] = useState(false);
  const { user, isAuth } = useSelector(state => state.user);

  const handleLogout = () => {
     dispatch(logout());
     setLoggedIn(false);
     history.push("/login")
  }
  
  useEffect(() => {
     const checkLogin = () => {
        if(isAuth === true) {
           setLoggedIn(true); 
        }
     }
     checkLogin();
  }, [loggedIn, isAuth]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
         <Toolbar>
            <Typography variant="h6" className={classes.title} href="/">
               <ContactsIcon className={classes.logo} /> Contacts App
            </Typography>
            {loggedIn ? 
            <div>
               <Button color="inherit">Hello {user.name}</Button>
               <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </div> : 
            <div>
               <Button color="inherit" href="/register">Register</Button>
               <Button color="inherit" href="/login">Login</Button>
            </div>}
         </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
