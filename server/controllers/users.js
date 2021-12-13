const User = require('../models/User');
const Contact = require('../models/Contact');
const ErrorResponse = require("../utils/errorResponse");

// associations
User.hasMany(Contact, {
   foreignKey: 'userId'
})

module.exports.registerUser = async(req, res, next) => {
   const { name, email, password } = req.body;
   try {
      const userExists = await User.findOne({ where: { email }});
      if (userExists) return next(new ErrorResponse("User already exist.", 400));
         
      if (password.length < 7) {
         return next(new ErrorResponse("Password must be atleast 7 characters long.", 400));
      }
      
      const newUser = await User.create({
         name,
         email,
         password
      })
      const authToken = newUser.getSignedToken()
      res.status(201).json({
         success: true,
         newUser,
         authToken
      })
   } catch (err) {
      next(err);
   }
}

module.exports.loginUser = async(req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }});
      if (!user) return next(new ErrorResponse("Invalid credentials entered.", 400));

      const validPassword = await user.validPassword(password);
      if(!validPassword) return next(new ErrorResponse("Invalid credentials entered.", 400));

      const authToken = user.getSignedToken();
      res.status(200).json({
         success: true,
         message: "Logged in successfully.",
         user,
         authToken
      })
   } catch (err) {
      next(err);
   }
}

module.exports.getUsers = async(req, res, next) => {
   try {
      const users = await User.findAll();
      res.status(200).json({
         success: true,
         users
      })
   } catch (err) {
      next(err);
   }
}

module.exports.getUser = async(req, res, next) => {
   const { userId } = req.params;
   try {
      const user = await User.findByPk(userId, {
         include: [ Contact ]
      })
      if (!user) return next(new ErrorResponse("User not found.", 400));
      
      res.status(200).json({
         success: true,
         user
      })
   } catch (err) {
      next(err);
   }
}