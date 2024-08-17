import express from 'express';
const router = express.Router();
import { CartController } from './cart.controller.js';

const cartController = new CartController();

router.post('/', (req, res) => {
    cartController.add(req, res)
});

router.get('/', (req, res) => {
    cartController.get(req, res)
});

router.delete('/:id', (req, res) => {
    cartController.delete(req, res)
});


export default router;