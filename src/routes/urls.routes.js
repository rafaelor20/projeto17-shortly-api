import { Router } from "express"
import { shortenUrlMiddle, getUrlMiddle, openUrlMiddle, deleteUrlMiddle } from "../middlewares/url.middleware.js"
import { shortenUrlControl, getUrlControl, openUrlControl, deleteUrlControl } from "../controllers/url.conttroller.js"

const urlRouter = Router()

urlRouter.post('/urls/shorten', shortenUrlMiddle, shortenUrlControl)
urlRouter.get("/urls/:id", getUrlMiddle, getUrlControl)
urlRouter.get("/urls/open/:shortUrl", openUrlMiddle, openUrlControl)
urlRouter.delete("/urls/:id", deleteUrlMiddle, deleteUrlControl)


export default urlRouter