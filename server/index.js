require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const api = process.env.API_URL;
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


//ROUTES
const accountRoutes = require('./src/routes/account');
const productRoutes = require('./src/routes/product');
const categoryRoutes = require('./src/routes/category');
const orderRoutes = require('./src/routes/orders');
const sellerRoutes = require('./src/routes/seller');
const cartRoutes = require('./src/routes/cart');
const reviewRoutes = require('./src/routes/reviews');

app.use(`${api}`, accountRoutes);
app.use(`${api}`, productRoutes);
app.use(`${api}`, categoryRoutes);
app.use(`${api}`, orderRoutes);
app.use(`${api}`, sellerRoutes);
app.use(`${api}`, cartRoutes);
app.use(`${api}`, reviewRoutes);


mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    dbName: 'vshop-database'
})
.then(()=>{
    console.log("Database connection is ready!")
    app.listen(port,'0.0.0.0', ()=>{
        console.log(`server is running http://localhost:${port}`);
    })
})