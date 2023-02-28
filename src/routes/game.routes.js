import { Router } from 'express'
import { gameSchemaValidation } from '../middlewares/game.middleware.js'
import { registerGame, listGames } from '../controllers/game.controller.js'

const routerGames = Router()


routerGames.post("/games", gameSchemaValidation, registerGame) 
routerGames.get("/games", listGames)

export default routerGames