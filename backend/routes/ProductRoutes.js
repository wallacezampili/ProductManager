const ProductController = require('../controllers/ProductController');
const verifyToken = require('../token/verifyToken');

//Set up Router
const router = require('express').Router();

//Add product route
router.post('/add', verifyToken, ProductController.addProduct);

//Edit product route
router.patch('/edit/:id', verifyToken, ProductController.editProduct);

//Delete product route
router.delete('/delete/:id', verifyToken, ProductController.deleteProduct);

//Get by id product route
router.get('/:id', verifyToken, ProductController.getById);

//Get products and filter
router.post('/', verifyToken, ProductController.filterProducts);

module.exports = router;

