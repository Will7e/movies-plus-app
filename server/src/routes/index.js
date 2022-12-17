import express from "express"
import userRoute from "./user.route.js"
import reviewRoute from "./review.route.js"
import mediaRoute from "./media.route.js"




const router = express.Router()

router.use("/user",userRoute)

export default router;

