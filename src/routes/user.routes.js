import { Router } from "express"
import { signIn, signUp } from "../controllers/user.Controller.js"
import {loginMiddleWare, registerMiddleWare} from "../middlewares/user.middleware.js"

const authRouter = Router()

authRouter.post('/signup', registerMiddleWare, signUp)
authRouter.post('/signin', loginMiddleWare, signIn)

export default authRouter