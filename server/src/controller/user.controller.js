import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";


const signUp = async (req, res) => {
    try{
        const {username, password,displayName} = req.body;
        
        const user = new userModel()

        const checkUser = await userModel.findOne({username});

        if(checkUser) return responseHandler.badRequest(res, "Username already exists");

        user.username = username;
        user.displayName = displayName;
        user.setPassword(password);
        await user.save();

        const token = jsonwebtoken.sign({
            data: user._id
        }, process.env.TOKEN_SECRET, {expiresIn: '24h'});
        responseHandler.created(res, {token,...user._doc,id : user._id});

    }
    catch(err){
        responseHandler.err(res, err);
    }
}

const signIn = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await userModel.findOne({username}).select("username password salt id displayName");

        if(!user) return responseHandler.badRequest(res, "Username does not exist");

        if(user.validatePassword(password)) return responseHandler.badRequest(res, "Password is incorrect");
        user.password = undefined;
        user.salt = undefined;
        const token = jsonwebtoken.sign({
            data: user._id
        }, process.env.TOKEN_SECRET, {expiresIn: '24h'});
        
        responseHandler.created(res, {token,...user._doc,id : user._id});
        

    }catch (err){
        responseHandler.err(res);
    }
}

const updatePassword = async (req, res) => {
    try{
        const {oldPassword, newPassword} = req.body;
        const user = await userModel.findById(req.user._id).select("password id salt");

        if(!user) return responseHandler.unAuthorized(res);

        if(!user.validatePassword(oldPassword)) return responseHandler.badRequest(res, "Old password is incorrect");

        user.setPassword(newPassword);
        await user.save();
        responseHandler.ok(res);
    }catch(err){
        responseHandler.err(res);
    }
}

const getUserInfo = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id)
        if(!user) return responseHandler.notFound(res);        
        
        responseHandler.ok(res, user);
    }catch(err){
        responseHandler.err(res);
    }
}

export default {
    signUp,
    signIn,
    updatePassword,
    getUserInfo
}
