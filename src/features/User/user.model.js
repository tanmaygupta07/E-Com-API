export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    // static async signUp(name, email, password, type) {
    //     try {
    //         //Connect to db
    //         const db = getDB();

    //         //collection to work with
    //         const collection = db.collection('users');

    //         const newUser = new UserModel(
    //             name,
    //             email,
    //             password,
    //             type
    //         )

    //         //insert the document
    //         await collection.insertOne(newUser);
    //         return newUser;
    //     }
    //     catch (err) {
    //         throw new ApplicationError('Something went wrong', 500)
    //     }

    //     // newUser.id = users.length + 1;
    //     // users.push(newUser);
    // }

    // static signIn(email, password) {
    //     const user = users.find(
    //         (u) =>
    //             u.email == email && u.password == password
    //     )
    //     return user;
    // }

    static getAll() {
        return users;
    }
}


var users = [
    {
        id: 1,
        name: 'Seller User',
        email: 'seller@yahoo.in',
        password: 'Password1',
        type: 'seller'
    },
    {
        id: 2,
        name: "Customer Seller",
        email: "customer@gmail.com",
        password: "pass1234",
        type: "customer"
    }
]