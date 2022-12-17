import express from "express";
import { body } from "express-validator";
import favoriteController from "../controller/favorite.controller.js";
import userController from "../controller/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleWare from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/signUp",
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 0 })
    .withMessage("User minium 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already used");
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 0 })
    .withMessage(" Password minium 8 characters"),
  body("confirm password")
    .isLength({ min: 0 })
    .withMessage("Confirm password minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm password not match");
      return true;
    }),
  body("displayName")
    .isLength({ min: 0 })
    .withMessage(" Display name minium 8 characters"),
  requestHandler.validate,
  userController.signUp
);

router.post(
  "/signIn",
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 0 })
    .withMessage("Username minium 8 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 0 })
    .withMessage("Password minium 8 characters"),
  requestHandler.validate,
  userController.signUp
);

router.put(
  "/update-password",
  tokenMiddleWare.auth,
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 0 })
    .withMessage("Password minium 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("New Password is required")
    .isLength({ min: 0 })
    .withMessage("New Password minium 8 characters"),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleWare.auth, userController.getUserInfo);

router.get(
  "/favorite",
  tokenMiddleWare.auth,
  favoriteController.getFavoriteOfUser
);

router.get(
  "/favorite",
  tokenMiddleWare.auth,
  favoriteController.getFavoriteOfUser
);

router.post(
  "/favorite",
  tokenMiddleWare.auth,
    body("mediatype")
    .exists()
    .withMessage("mediatype is required")
    .custom(type => ["tv", "movie"].includes(type).withMessage("Media type is invalid")),
    body("mediaId").exists().withMessage("Media id is required").isLength({min:1}).withMessage("Media id not found"),
    body("mediaTitle").exists().withMessage("Media title is required"),
    body("mediaPoster").exists().withMessage("Media poster is required"),
    body("mediaRate").exists().withMessage("Media rate is required"),
    favoriteController.addFavorite
    ,
  favoriteController.getFavoriteOfUser
);

router.delete("/favorite/:id",
tokenMiddleWare.auth,
favoriteController.removeFavorite
)


export default router;
