import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
    try {
        const {movieId} = req.params;
        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        });
        await review.save();
        responseHandler.created(res, {
            ...review._doc,
            id : review._id,
            user: req.user
        });
    } catch (err) {
        responseHandler.err(res);
    }
}

const remove = async(req,res) =>{
    try {
        const {reviewId} = req.params
        const review = reviewModel.findOne({
            _id: reviewId,
            user : req.user.id
        } )

        if(!review)  return responseHandler.notFound(res)
        await review.remove()

        responseHandler.ok(res)
    } catch {
        responseHandler.err(res)
    
    }
}
const getReviewsOfUser = async(req,res) =>{
    try{
        const review = reviewModel.findOne({
            user: req.user.id
        }).sort("-CreatedAt")
        responseHandler.ok(res,review)
    }catch{
        responseHandler.err(res)
    }
    
}
export default {create,getReviewsOfUser,remove}







