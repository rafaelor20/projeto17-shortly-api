import { Router } from "express"
import { shortenUrlMiddle, getUrlMiddle } from "../middlewares/url.middleware.js"
import { shortenUrlControl, getUrlControl } from "../controllers/url.conttroller.js"

const urlRouter = Router()

urlRouter.post('/urls/shorten', shortenUrlMiddle, shortenUrlControl)
urlRouter.get("/urls/:id", getUrlMiddle, getUrlControl)
urlRouter.get("/urls/open/:shortUrl", getUrlMiddle, getUrlControl)


export default urlRouter