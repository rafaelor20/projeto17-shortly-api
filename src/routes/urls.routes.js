import { Router } from "express"
import { shortenUrlMiddle } from "../middlewares/url.middleware.js"
import { shortenUrlControl } from "../controllers/url.conttroller.js"

const urlRouter = Router()

urlRouter.post('/urls/shorten', shortenUrlMiddle, shortenUrlControl)

export default urlRouter