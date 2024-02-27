const moongoose = require('../db/conn');

const categorySchema = new moongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const Category = moongoose.model('Category', categorySchema);
module.exports = Category;