import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.Middleware.js';
const userRouter = express.Router();

const userController = new UserController;

userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next)
});
userRouter.post('/signin', (req, res) => {
    userController.signIn(req, res)
});
userRouter.post('/resetPassword', jwtAuth, (req, res) => {
    userController.resetPassword(req, res)
});

export default userRouter;