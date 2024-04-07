import { log } from 'console';
import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next)=>{
    
    log(req.headers)
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    const tokenValue = token.replace('Bearer ', '');
    
    try{
        const payload = jwt.verify(
            tokenValue,
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz"
        );
        req.user = { userID: payload.userID };
        req.name={userName:payload.name}
        console.log(payload);
    } catch(err){
        
        console.log(err);
        return res.status(401).send('Token Expired Please login again');
    }

    
    next();
};

export default jwtAuth;