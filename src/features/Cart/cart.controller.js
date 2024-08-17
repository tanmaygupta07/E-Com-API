import CartModel from "./cart.model.js ";
import CartRepository from "./cart.repository.js";

export class CartController {

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async add(req, res) {
        try {
            const { productID, quantity } = req.body;
            const userID = req.userID;
            await this.cartRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated.");
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async get(req, res) {
        try {
            const userID = req.userID;
            const items = await this.cartRepository.get(userID);
            return res.status(200).send(items);
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async delete(req, res) {
        try {
            const userID = req.userID;
            const cartItemID = req.params.id;
            const isDeleted = await this.cartRepository.delete(userID, cartItemID);
            if (!isDeleted) {
                return res.status(400).send("Item not found");
            }
            return res.status(200).send("Item is successfully deleted");
        } catch (err) {
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}