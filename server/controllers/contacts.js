const User = require('../models/User');
const Contact = require('../models/Contact');
const ErrorResponse = require("../utils/errorResponse");

// associations
Contact.belongsTo(User, {
   foreignKey: 'userId'
})

module.exports.createContact = async(req, res, next) => {
   const { firstname, lastname, email, phone, userId } = req.body;
   try {
      const contactExists = await Contact.findOne({ where: { phone, userId }});
      if (contactExists) return next(new ErrorResponse("Phone already exist.", 400));

      // check that all fields are filled
      if (!firstname || !lastname || !email || !phone) {
         return next(new ErrorResponse("Please, enter all fields.", 400));
      }

      const userExists = await User.findByPk(userId);
      if(!userExists) return next(new ErrorResponse("User does not exist.", 400));

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
      next(err);
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
      next(err);
   }
}

module.exports.getContact = async(req, res, next) => {
   const { contactId } = req.params;
   try {
      const contact = await Contact.findByPk(contactId, {
         include: [ User ]
      })
      if (!contact) return next(new ErrorResponse("Contact not found.", 400));

      res.status(200).json({
         success: true,
         contact
      })
   } catch (err) {
      next(err);
   }
}

module.exports.updateContact = async(req, res, next) => {
   const { contactId } = req.params;
   try {
      const [ updated ] = await Contact.update(req.body, {
         where: { id: contactId }
      })
      if (!updated) return next(new ErrorResponse("Error updating contact.", 400));

      const updatedContact = await Contact.findOne({ where: { id: contactId }});
      res.status(200).json({
         success: true,
         updatedContact
      })
   } catch (err) {
      next(err);
   }
}

module.exports.deleteContact = async(req, res, next) => {
   const { contactId } = req.params;
   try {
      const deleted = await Contact.destroy({
         where: { id: contactId }
      })
      if (!deleted) return next(new ErrorResponse("Error deleting contact.", 400));

      res.status(200).json({
         success: true,
         message: 'Contact deleted successfully.'
      })
   } catch (err) {
      next(err);
   }
}