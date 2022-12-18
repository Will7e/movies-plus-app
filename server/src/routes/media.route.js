import express from "express"
import mediaController from "../controller/media.controller.js"

const route = express.Router({mergeParams:true})

route.get("/genres",mediaController.getGenres)
route.get("/search",mediaController.search)
route.get("/detail/:mediaId",mediaController.getMediaDetails)
route.get("/:mediaCategory",mediaController.getList)

export default route;

