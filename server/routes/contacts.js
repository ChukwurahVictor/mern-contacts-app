const router = require('express').Router();
const { protect } = require('../middlewares/auth');

// controllers
const { 
   createContact, 
   getContacts, 
   getContact, 
   updateContact, 
   deleteContact 
} = require('../controllers/contacts');

// routes
router.route('/').post(protect,createContact);
router.route('/').get(protect, getContacts);
router.route('/:contactId').get(protect, getContact);
router.route('/:contactId').patch(protect, updateContact);
router.route('/:contactId').delete(protect, deleteContact);

module.exports = router;