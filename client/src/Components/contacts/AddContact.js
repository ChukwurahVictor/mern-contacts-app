import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts';

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

   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [error, setError] = useState('');

   const dispatch = useDispatch();
   const { user } = useSelector(state => state.user);
   const contactState = useSelector(state => state.contacts);
   
   const userId = user.id;
     
   const handleSubmit = (e) => {
      e.preventDefault();
      
      try {
         
         dispatch(addContact({ firstname, lastname, email, phone, userId }));

         setFirstname("");
         setLastname("");
         setEmail("");
         setPhone("");

         setError(contactState.error);
         setTimeout(() => {
            setError('');
            console.log(contactState.error);
         }, 5000);
            
      } catch(error) {
         console.log(error);
                  
         setFirstname(firstname);
         setLastname(lastname);
         setEmail(email);
         setPhone(phone);
      }
   }
   console.log(error);
   
   return (
      <>
      {error && <span className="error-message">{error}</span>}
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
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