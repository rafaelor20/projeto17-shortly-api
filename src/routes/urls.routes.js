import { Router } from "express"
import { shortenUrlMiddle, getUrlMiddle, openUrlMiddle } from "../middlewares/url.middleware.js"
import { shortenUrlControl, getUrlControl, openUrlControl } from "../controllers/url.conttroller.js"

const urlRouter = Router()

urlRouter.post('/urls/shorten', shortenUrlMiddle, shortenUrlControl)
urlRouter.get("/urls/:id", getUrlMiddle, getUrlControl)
urlRouter.get("/urls/open/:shortUrl", openUrlMiddle, openUrlControl)


export default urlRouter