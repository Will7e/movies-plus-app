const base_URL = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoints, params) => {
    const qs = new URLSearchParams(params)
    return `${base_URL}${endpoints}?api_key=${key}&${qs.toString()}`
}

export default {getUrl}
