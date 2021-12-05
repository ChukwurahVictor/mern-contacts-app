import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getContacts, addContact } from '../../redux/contacts';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
      form: {
         width: '100%', // Fix IE 11 issue.
         margin: theme.spacing(10)
      },
   },
}));

const AddContact = () => {
   const classes = useStyles();
   const history = useHistory();

   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [error, setError] = useState('');

   const dispatch = useDispatch();
   const { user } = useSelector(state => state.user);

   const addContact = async(e) => {
      // e.preventDefault();
      // console.log(data);
      
      const config = {
         header: {
            "Content-Type": "application/json",
         },
      };
      
      const userId = user.id;
      
      try {
         const { data } = await axios.post('http://localhost:5000/api/contacts', 
         { firstname, lastname, email, phone, userId }, 
         config
         );
         
         const contactAdded = dispatch(addContact(data));
         if(contactAdded) {
            return history.push("/");
         } else {
            setFirstname(firstname);
            setLastname(lastname);
            setEmail(email);
            setPhone(phone);
         }
            
            setFirstname(firstname);
            setLastname("");
            setEmail("");
            setPhone("");

         } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => {
               setError('');
            }, 5000);
         }
      }

   return (
      <>
      {error && <span className="error-message">{error}</span>}
      <form onSubmit={addContact} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Last Name"
            id="lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Contact
          </Button>
        </form>
        </>
   );
}

export default AddContact;