import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;

    const { mediaType, mediaCategory } = req.params;
    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    responseHandler.ok(res, response);
  } catch (err) {
    responseHandler.err(res, err);
  }
};

const getMediaDetails = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetails(params);

    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const favorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.favorite = favorite !== null;
      }
    }
    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

  
    responseHandler.ok(res, media);
  } catch (err) {
    responseHandler.err(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.err(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;
    const response = await tmdbApi.mediaSearch({
      mediaType: mediaType === "people" ? "person" : mediaType,
      query,
      page,
    });
    responseHandler.ok(res, response);
  } catch (err) {
    responseHandler.err(res, err);
  }
};

export default { getList, getMediaDetails, getGenres, search };
