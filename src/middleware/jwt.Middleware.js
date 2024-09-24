import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, done) => {
    const authHead = req.headers['authorization'];
    let token = authHead.split(' ')[1];
    console.log(req.headers['authorization']);
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    try {
        const payload = jwt.verify(
            token, 'AIBDHIDdigfisgdfiysdgydscf'
        );

        req.userID = payload.userID;
    }
    catch (err) {
        console.log(err);
        return res.status(401).send('Invalid token | Unauthorized');
    }
    done();
}

export default jwtAuth;