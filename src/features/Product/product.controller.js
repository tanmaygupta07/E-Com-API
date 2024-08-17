import ProductModel from './product.model.js';
import ProductRepository from './product.repository.js';

export default class ProductController {

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async addProduct(req, res) {
        try {
            const { name, price, category, sizes, categories, description } = req.body;
            const newProduct = new ProductModel(name, description, parseFloat(price), req?.file?.filename, categories, sizes?.split(','));
            console.log(newProduct);

            const createProduct = await this.productRepository.add(newProduct);
            res.status(201).send(createProduct);
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong")
        }

    }

    async rateProduct(req, res, next) {
        console.log(req.query);
        try {
            const userID = req.userID;
            const productID = req.body.productID;
            const rating = req.body.rating;
            await this.productRepository.rateProduct(
                userID,
                productID,
                rating
            );

            return res.status(200).send("Rating has been added");
        }
        catch (err) {
            next(err);
        }
    }

    async getOneProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if (!product) {
                res.status(404).send('Product not found!');
            }
            else {
                res.status(200).send(product);
            }
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async filterProduct(req, res) {
        try {
            const minPrice = req.query.minPrice;
            // const maxPrice = req.query.maxPrice;
            const categories = req.query.categories;
            const result = await this.productRepository.filter(
                minPrice,
                // maxPrice,
                categories
            );
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async averagePrice(req, res, next){
        try {
            const result = await this.productRepository.averageProductPriceCategory();
            res.status(200).send(result);
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}