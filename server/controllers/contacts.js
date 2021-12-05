const User = require('../models/User');
const Contact = require('../models/Contact');

// associations
Contact.belongsTo(User, {
   foreignKey: 'userId'
})


module.exports.createContact = async(req, res, next) => {
   const { firstname, lastname, email, phone, userId } = req.body;
   try {
      // check that all fields are filled
      if (!firstname || !lastname || !email || !phone) {
         return res.status(400).json({
            success: false,
            message: 'Please, enter all fields'
         })
      }

      const nameExists = await Contact.findOne({ where: { phone, userId }});
      if (nameExists) {
         return res.status(400).json({
            success: false,
            message: 'Phone already exist.'
         })
      }

      const userExists = await User.findByPk(userId);
      if(!userExists) {
         return res.status(400).json({
            success: false,
            message: 'User does not exist.'
         })
      }

      const newContact = await Contact.create({
         firstname,
         lastname,
         email,
         phone,
         userId
      })
      res.status(201).json({
         success: true,
         newContact
      })
   } catch (err) {
      console.log(err);
   }
}

module.exports.getContacts = async(req, res, next) => {
   try {
      const contacts = await Contact.findAll();
      res.status(200).json({
         success: true,
         contacts
      })
   } catch (err) {
      console.log(err);
   }
}

module.exports.getContact = async(req, res, next) => {
   const { contactId } = req.params;
   try {
      const contact = await Contact.findByPk(contactId, {
         include: [ User ]
      })
      if (!contact) {
         return res.status(400).json({
            success: false,
            message: 'Contact not found.'
         });
      }
      res.status(200).json({
         success: true,
         contact
      })
   } catch (err) {
      console.log(err);
   }
}

module.exports.updateContact = async(req, res, next) => {
   const { contactId } = req.params;
   try {
      const [ updated ] = await Contact.update(req.body, {
         where: { id: contactId }
      })
      if (!updated) {
         return res.status(400).json({
            success: false,
            message: 'Error updating contact.'
         })
      }
      const updatedContact = await Contact.findOne({ where: { id: contactId }});
      res.status(200).json({
         success: true,
         updatedContact
      })
   } catch (err) {
      console.log(err);
   }
}

module.exports.deleteContact = async(req, res, next) => {
   const { contactId } = req.params;
   try {
      const deleted = await Contact.destroy({
         where: { id: contactId }
      })
      if (!deleted) {
         return res.status(400).json({
            success: false,
            message: 'Error deleting contact.'
         })
      }
      res.status(200).json({
         success: true,
         message: 'Contact deleted successfully.'
      })
   } catch (err) {
      console.log(err);
   }
}