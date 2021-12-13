import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContact, updateContact } from '../../redux/contacts';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
      form: {
         width: '100%', // Fix IE 11 issue.
         margin: theme.spacing(10),
      },
   }   
}));

const UpdateContact = (props) => {
   const classes = useStyles();

   const dispatch = useDispatch();
   const { user } = useSelector(state => state.user);

   const userId = user.id;
   const contactId = props.match.params.id;   
   
   useEffect(() => {
      const getContact = async() => {
         const response = await dispatch(fetchContact(contactId));
         const res = response.payload.data.contact;
         setData(res);
      }
      getContact();
   }, [dispatch, contactId])

   const [data, setData] = useState([]);
   const [firstname, setFirstname] = useState(data.firstname);
   const [lastname, setLastname] = useState(data.lastname);
   const [email, setEmail] = useState(data.email);
   const [phone, setPhone] = useState('');
   const [error, setError] = useState('');

   const contactState = useSelector(state => state.contacts);
   
   if(!data) {
      console.log(data);
      return "loading..."
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      
      try {
         
         dispatch(updateContact({ firstname, lastname, email, phone, userId }));

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

   return (
      <>
      <Grid item xs={12} md={8}>
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
               Update Contact
            </Button>
         </form>
        </Grid>
        </>
   );
}

export default withRouter(UpdateContact);