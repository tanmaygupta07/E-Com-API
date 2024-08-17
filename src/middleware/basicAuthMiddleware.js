import UserModel from '../features/User/user.model.js';


const basicAuth = (req, res, next) => {
    console.log('We are in this function');
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send('No Authorization details found!');
    }
    console.log(authHeader);

    const base64Credentials = authHeader.replace('Basic', '');
    console.log(base64Credentials);

    const decodeCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    console.log(decodeCreds);

    const creds = decodeCreds.split(':');

    const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);
    if(user){
        next();
    }
    else{
        return res.status(401).send('Incorrect Credentials');
    }
}


export default basicAuth;