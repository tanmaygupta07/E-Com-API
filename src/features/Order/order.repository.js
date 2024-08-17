import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
    constructor() {
        this.collection = "orders";
    }

    async placeOrder(userID) {
        const client = getClient();
        const session = client.startSession();
        try {
            const db = getDB();
            session.startTransaction();

            const items = await this.getTotalAmount(userID, session);
            const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0)
            console.log(finalTotalAmount);

            const newOrder = new OrderModel(new ObjectId(userID), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, { session });

            for (let item of items) {
                await db.collection("products").updateOne(
                    { _id: item.productID },
                    { $inc: { stock: -item.quantity } }, { session }
                )
            }
            // throw new Error("Something is wrong in placeOrder");

            await db.collection("cart").deleteMany({
                userID: new ObjectId(userID)
            }, { session });
            await session.commitTransaction();
            session.endSession();
            return;
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    async getTotalAmount(userID, session) {
        try {
            const db = getDB();
            const items = await db.collection("cart").aggregate([
                {
                    $match: {
                        userID: new ObjectId(userID)
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productID",
                        foreignField: "_id",
                        as: "productInfo"
                    }
                },
                {
                    $unwind: "$productInfo"
                },
                {
                    $addFields: {
                        "totalAmount": {
                            $multiply: ["$productInfo.price", "$quantity"]
                        }
                    }
                }
            ], { session }).toArray();
            return items;
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }
}