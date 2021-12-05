const User = require('../models/User');
const Contact = require('../models/Contact');

// associations
User.hasMany(Contact, {
   foreignKey: 'userId'
})

module.exports.registerUser = async(req, res, next) => {
   const { name, email, password } = req.body;
   try {
      const userExists = await User.findOne({ where: { email }});
      if (userExists) {
         return res.status(400).json({
            success: false,
            message: 'User already exist.'
         })
      }
      if (password.length < 7) {
         return res.status(400).json({
            success: false,
            message: 'Password must be atleast 7 characters long.'
         })
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
      console.log(err);
   }
}

module.exports.loginUser = async(req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }});
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Invalid credentials entered."
         })
      }

      const validPassword = await user.validPassword(password);
      if(!validPassword) {
         return res.status(400).json({
            success: false,
            message: "Invalid password entered."
         })
      }
      const authToken = user.getSignedToken();
      res.status(200).json({
         success: true,
         message: "Logged in successfully.",
         user,
         authToken
      })
   } catch (err) {
      console.log(err);
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
      console.log(err);
   }
}

module.exports.getUser = async(req, res, next) => {
   const { userId } = req.params;
   try {
      const user = await User.findByPk(userId, {
         include: [ Contact ]
      })
      if (!user) {
         return res.status(400).json({
            success: false,
            message: 'User not found.'
         });
      }
      res.status(200).json({
         success: true,
         user
      })
   } catch (err) {
      console.log(err);
   }
}

// module.exports.updateUser = async(req, res, next) => {
//    res.send('Update user route');
// }

// module.exports.deleteUser = async(req, res, next) => {
//    res.send('Delete user route');
// }