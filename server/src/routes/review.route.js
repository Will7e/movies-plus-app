import express from "express";
import { body } from "express-validator";
import reviewController from "../controller/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router({ mergeParams: true });

router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

router.post(
  "/",
  tokenMiddleware.auth,
  body("mediaId")
    .exists()
    .withMessage("Media id is required")
    .isLength({ min: 1 })
    .withMessage("Media id is not found"),
  body("content")
    .exists()
    .withMessage("Content id is required")
    .isLength({ min: 1 })
    .withMessage("Content id is not found"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaTitle").exists().withMessage("Media title is required"),
  body("mediaPoster").exists().withMessage("Media poster is required"),
  requestHandler.validate,
  reviewController.create
);

router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

export default router;
