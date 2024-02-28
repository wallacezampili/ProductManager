const UserController = require('../controllers/UserController');
const router = require('express').Router();

//Register User Route
router.post('/register', UserController.register);

//Login User Route
router.post('/login', UserController.login);

module.exports = router;