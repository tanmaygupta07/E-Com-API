import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from 'mongodb';
import { ApplicationError } from "../../error-handler/applicationError.js";

const LikeModel = mongoose.model('Like', likeSchema);

export class LikeRepository {
    async likeProduct(userID, productID) {
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userID),
                likeable: new ObjectId(productID),
                types: 'Product'
            });
            await newLike.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    async likeCategory(userID, categoryID) {
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userID),
                likeable: new ObjectId(categoryID),
                types: 'Category'
            });
            await newLike.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    async getLikes(type, id) {
        try {
            return await LikeModel.find({
                likeable: new ObjectId(id),
                types: type
            }).populate('user').populate({ path: 'likeable', model: type })
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }
}