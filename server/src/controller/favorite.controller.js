import responseHandler from "../handlers/response.handler";
import favoriteModel from "../models/favorite.model";


const addFavorite = async (req, res) => {
    try {
        
        const isFavorite = await favoriteModel.findOne({user: req.user.id,mediaId: req.body.mediaId});
        if(isFavorite) return responseHandler.ok(res, isFavorite);
        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        });
       await favorite.save()
    responseHandler.created(res, favorite);
       
    } catch (err) {
        responseHandler.err(res);
    }
}

const removeFavorite = async (req, res) => {
    try {
        const {favoriteId} = req.params;

        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        });
        if(!favorite) return responseHandler.notFound(res);
        await favorite.remove();

        responseHandler.ok(res);

    } catch (err) {
        responseHandler.err(res);
    }
}


const getFavoriteOfUser = async (req, res) => {
    try {
        const favorites = await favoriteModel.find({user: req.user.id}).sort("-createdAt");
        responseHandler.ok(res, favorites);
    } catch (err) {
        responseHandler.err(res);
    }
}


export default { addFavorite, removeFavorite, getFavoriteOfUser };