import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetails = async (req, res) => {
    try {
        const {personId} = req.params;
        const response = await tmdbApi.personDetails({personId});
        responseHandler.ok(res, response);
    } catch (err) {
        responseHandler.err(res);
    }
}

const personMedias = async (req, res) => {
    try {
        const {personId} = req.params;
        const response = await tmdbApi.personMedias({personId});
        responseHandler.ok(res, response);
    } catch (err) {
        responseHandler.err(res);
    }
}

export default { personDetails, personMedias };