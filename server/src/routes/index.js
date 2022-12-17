import express from "express"
import userRoute from "./user.route.js"
import reviewRoute from "./review.route.js"
import mediaRoute from "./media.route.js"
import personRoute from "./person.route.js"


const router = express.Router()

router.use("/user",userRoute)
router.use("/person",personRoute)
router.use("/review",reviewRoute)
router.use("/:mediaType",mediaRoute)

export default router;

