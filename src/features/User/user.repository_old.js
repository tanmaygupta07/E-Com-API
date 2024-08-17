import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";

class UserRepository {

    constructor(){
        this.collection = "users"
    }

    async signUp(newUser) {
        try {
            //Connect to db
            const db = getDB();

            //collection to work with
            const collection = db.collection(this.collection);

            //insert the document
            await collection.insertOne(newUser);
            return newUser;
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }

    async signIn(email, password) {
        try {
            //Connect to db
            const db = getDB();

            //collection to work with
            const collection = db.collection(this.collection);

            //find the document
            return await collection.findOne({email, password});
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }

    async findByEmail(email) {
        try {
            //Connect to db
            const db = getDB();

            //collection to work with
            const collection = db.collection('users');

            //find the document
            return await collection.findOne({email});
        }
        catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong with database', 500)
        }
    }
}

export default UserRepository