//Set up
const express = require('express');
const conn = require('./db/conn');
const cors = require('cors');

const app = express();


//Enable cors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

//Enable JSON requests and responses
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


//Product Routes
const ProductRoutes = require('./routes/ProductRoutes');
app.use('/products', ProductRoutes);

//User Routes
const UserRoute = require('./routes/UserRoutes');
app.use('/users', UserRoute);

//Category Routes
const CategoryRoutes = require('./routes/CategoryRoutes');
app.use('/categories', CategoryRoutes);

app.listen(5000);

