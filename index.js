import express from 'express';
import swagger from 'swagger-ui-express';

import productRouter from './src/features/Product/product.router.js'
import userRouter from './src/features/User/user.router.js';
import jwtAuth from './src/middleware/jwt.Middleware.js';
import cartRouter from './src/features/Cart/cart.router.js';
import apiDocs from './swagger.json' assert {type: "json"};
import loggerMiddleware from './src/middleware/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
// import { connectToMongoDB } from './src/config/mongodb.js';
import orderRouter from './src/features/Order/order.router.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import mongoose, { mongo } from 'mongoose';
import likeRouter from './src/features/Like/like.router.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Hi welcome to the E-Commerce API");
});


app.use(express.json());
app.use(loggerMiddleware);

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api/orders', jwtAuth, orderRouter)
app.use('/api/product', jwtAuth, productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart',loggerMiddleware, jwtAuth, cartRouter);
app.use('/api/like', jwtAuth, likeRouter)

app.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send("Something went wrong, please try again later!");
})

app.use((req, res) => {
    res.status(404).send("API not found!")
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
    connectUsingMongoose();
})