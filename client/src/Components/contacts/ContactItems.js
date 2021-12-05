import React from 'react';
import AddContact from './AddContact';
import ContactList from './ContactList';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

const ContactItems = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl">
      <Grid container className={classes.root} spacing={5}>
        <Grid item xs={12} sm={6}>
          <AddContact />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ContactList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactItems;