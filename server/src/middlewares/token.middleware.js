import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler';
import userModel from '../models/user.model';


const tokenDecoded =(req) => {
    try {
        const bearerHeader = req.headers['authorization'];

        if(bearerHeader){
            const token = bearerHeader.split(' ')[1];

            return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        }
    }catch{
        return false;
    }
}

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecoded(req);

    if(!token) return responseHandler.unAuthorized(res);

    const user = await userModel.findById(tokenDecoded.data)
    
    if(!user) return responseHandler.unAuthorized(res);

    req.user = user;
    next();
}

export default {
    auth,
    tokenDecoded
}