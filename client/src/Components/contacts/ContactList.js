import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getContacts, deleteContact } from '../../redux/contacts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 2, 2),
  },
}));


const ContactList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const contactState = useSelector(state => state.contacts);
  const { contacts } = contactState;
  
  useEffect(() => {
    dispatch(getContacts(user.id));
  }, [dispatch, user]);
   
  const handleDelete = async(id) => {
    dispatch(deleteContact(id));
    dispatch(getContacts(user.id));
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
         <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            My Contacts
          </Typography>
          {contacts.length > 0 ?
          <div>
            {contacts.map((i) => {
            return ( 
            <List key={i.id} style={{maxHeight: '100%', overflow: 'auto'}}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={i.firstname + ' ' + i.lastname} 
                    secondary={i.phone}
                  />
                  <ListItemSecondaryAction>
                    <Link to={"update/" + i.id}>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(i.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
            )})}
          </div> :
          <div> 
            <span>No contacts to display.</span>
          </div>}
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactList;