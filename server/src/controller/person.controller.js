import responseHandler from "../handlers/response.handler";
import tmdbApi from "../tmdb/tmdb.api";

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