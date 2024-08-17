import express from 'express';
const router = express.Router();
import ProductController from './product.controller.js';
import { upload } from '../../middleware/fileUploadMiddleware.js';

const productController = new ProductController();

router.get('/', (req, res) => {
    productController.getAllProducts(req, res)
});

router.post('/', upload.single('imageURL'), (req, res) => {
    productController.addProduct(req, res)
});

router.get('/filter', (req, res) => {
    productController.filterProduct(req, res)
});

router.get('/averagePrice', (req, res, next) => {
    productController.averagePrice(req, res)
});

router.get('/:id', (req, res) => {
    productController.getOneProduct(req, res)
});

router.post('/rate', (req, res, next) => {
    productController.rateProduct(req, res, next)
});



export default router;