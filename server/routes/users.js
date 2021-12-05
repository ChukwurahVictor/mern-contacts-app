const router = require('express').Router();
const { protect } = require("../middlewares/auth");

// controllers
const { 
   registerUser,
   loginUser,
   getUsers,
   getUser,
   updateUser,
   deleteUser
} = require('../controllers/users');

// routes
// @desc user registration
router.route('/register').post(registerUser);

// @desc user login
router.route('/login').post(loginUser);

router.route('/').get(getUsers);

router.route('/:userId').get(getUser);

// router.route('/:userId').patch(updateUser);

// router.route('/:userId').delete(deleteUser);

module.exports= router;