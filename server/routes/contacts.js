const router = require('express').Router();

// controllers
const { 
   createContact, 
   getContacts, 
   getContact, 
   updateContact, 
   deleteContact 
} = require('../controllers/contacts');

// routes
router.route('/').post(createContact);
router.route('/').get(getContacts);
router.route('/:contactId').get(getContact);
router.route('/:contactId').patch(updateContact);
router.route('/:contactId').delete(deleteContact);

module.exports = router;