import { Router } from "express"
import { shortenUrlMiddle } from "../middlewares/url.middleware"

const urlRouter = Router()

urlRouter.post('/urls/shorten', shortenUrlMiddle)