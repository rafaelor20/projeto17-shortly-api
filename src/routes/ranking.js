import { Router } from "express"
import { rankUsers } from "../controllers/ranking.controller.js"

const rankRouter = Router()

rankRouter.get('/ranking', rankUsers)

export default rankRouter