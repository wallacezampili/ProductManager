//Object for Category database operations
const Category = require('../models/Category');

module.exports = class CategoryController {

    static async addCategory(req, res) {
        //Get data from body
        const { name } = req.dody;

        //Check if there is already one category with that name
        const category = Category.findOne({ name: name });
        if (category) {
            return res.status(422).json({ message: "There is already a category with this name!" });
        }

        const newCategory = new Category({ name });

        //Add category to database
        await newCategory.save().then(() => {
            res.status(200).json({ message: "Category succefully added!" });
            //console.log("Category succefully added!");
        }).catch((err) => {
            res.status(400).json({ message: err.message })
        })

    }

    static async checkAndAddCategory(name) {

        //Check if there is already one category with that name
        const category = await Category.findOne({ name: name });

        if (category) {
            //console.log("Category in the database!", category);
            return category;
        }

        const newCategory = new Category({ name });

        //Add category to database
        await newCategory.save().then(() => {
            //console.log("Category succefully added!", newCategory);

        }).catch((err) => {
            console.log("An error ocorred while trying to add a new category: ", err.message);
        });

        return newCategory;

    }

    static async checkAndDeleteCategory(productsWithCategory, categoryId) {
        if (productsWithCategory.length === 0) {
            await Category.deleteOne({ _id: categoryId }).then(() => {
                //console.log("Category succefully deleted!", { _id: categoryId });
            }).catch((err) => {
                console.log("An error ocorred while trying to remove a  category: ", err.message);
            })

        }
    }

    static async getAllCategories(req, res) {

        //Get all categories and send them as response
        const categories = await Category.find().catch((err) => {
            return res.status(400).json({ message: err.message });
        });


        res.status(200).json({ message: "Operation executed with success!", categories });
        //console.log("Operation executed with success!");
    }
}