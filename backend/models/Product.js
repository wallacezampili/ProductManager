const mongoose = require('../db/conn');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: Object
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;