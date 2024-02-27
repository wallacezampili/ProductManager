const CategoryController = require('../controllers/CategoryController');
const router = require('express').Router();
const verifyToken = require('../token/verifyToken');

//Get all categories
router.get('/', verifyToken, CategoryController.getAllCategories);

module.exports = router;