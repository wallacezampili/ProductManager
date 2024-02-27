const Product = require('../models/Product');
const CategoryController = require('../controllers/CategoryController');
const { ObjectId } = require('mongoose').Types;
module.exports = class ProductController {

    static productValidations(product, res) {
        if (!product.name) {
            res.status(422).json({
                message: "The product name is needed!"
            });

            return false;
        }

        if (!product.price) {
            res.status(422).json({
                message: "The product price is needed!"
            });

            return false;
        }

        if (!product.description) {
            res.status(422).json({
                message: "The product description is needed!"
            });

            return false;
        }


        if (!product.category) {
            res.status(422).json({
                message: "The product category is needed!"
            });

            return false;
        }
        return true;


    }

    static async addProduct(req, res) {

        //Get data from body
        const { name, price, category, description } = req.body;


        //Validations
        let isProductValid = ProductController.productValidations({ name, price, category, description }, res);
        if (!isProductValid) { return }

        //Check if there is already this category in database
        const verifyedCategory = await CategoryController.checkAndAddCategory(category);
        const product = new Product({ name, price, category: verifyedCategory, description })

        //Save product to database
        await product.save().then(() => {

            res.status(200).json({ message: "Product succefully added!", product });
            //console.log("Product succefully added!", product);

        }).catch((err) => {
            res.status(400).json({ message: err });
        });

    }

    static async editProduct(req, res) {

        //Get id from params
        const id = req.params.id;

        //Id validation
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "This product id is invalid!" });
        }


        //Check if product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(422).json({ message: "This product does not exist!" });
        }

        //Get data from body
        const { category, name, price, description } = req.body;
        const newProduct = { category, name, price, description };

        //Validations
        let isProductValid = ProductController.productValidations(newProduct, res);
        if (!isProductValid) { return }

        //Get veryfied category
        const veryfiedCategory = await CategoryController.checkAndAddCategory(category);
        newProduct.category = veryfiedCategory;

        //Edit product in database
        await Product.updateOne({ _id: id }, newProduct).then(async () => {

            //Removes the category if the edited product was the last in this category and that changed
            if (product.category.name !== veryfiedCategory.name) {
                const productsWithCategory = await Product.find({ ["category.name"]: product.category.name });
                //console.log(productsWithCategory);
                await CategoryController.checkAndDeleteCategory(productsWithCategory, product.category._id);
            }


            res.status(200).json({ message: "Product succefully edited!" });
            //console.log("Product succefully edited!", newProduct);

        }).catch((err) => {
            res.status(400).json({ message: err.message });
        });

    }


    static async deleteProduct(req, res) {

        //Get id from params
        const id = req.params.id;

        //Id validation
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "This product id is invalid!" });
        }

        //Check if product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(422).json({ message: "This product does not exist!" });
        }

        //Delete product from database
        await Product.deleteOne({ _id: id }).then(async () => {

            //Removes the category, if the deleted product was the last in this category
            const productsWithCategory = await Product.find({["category.name"]: product.category.name })
            //console.log(productsWithCategory);
            CategoryController.checkAndDeleteCategory(productsWithCategory, product.category._id);

            res.status(200).json({ message: "Product succefully deleted!" });

        }).catch(err => {
            res.status(400).json({ message: err.message })
        });


    }


    static async getById(req, res) {

        //Get id from params
        const id = req.params.id;

        //Id validation
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "This product id is invalid!" });
        }

        //Check if product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(422).json({ message: "This product does not exist!" });
        }

        res.status(200).json({ product });
        //console.log("Get operation!", product)



    }


 

    static async filterProducts(req, res) {
        //Get filters from body
        const { name, category } = req.body;
        let filter = {};

        if(name){
            filter = {...filter, 'name': new RegExp(name, 'i')};
        }

        if(category)
        {
            filter = {...filter, 'category.name': category};
        }

        //console.log(filter);
        
        try {
            const products = await Product.find(filter);
            //console.log(`Products from get operation: ${products}`);
            return res.status(200).json({ products });

        } catch (err) {
            return res.status(400).json({ message: err.message });
        }

    }
}