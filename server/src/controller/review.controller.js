import responseHandler from "../handlers/response.handler";
import reviewModel from "../models/review.model";

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