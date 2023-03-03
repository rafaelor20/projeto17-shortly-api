import { Router } from "express"
import { signIn, signUp } from "../controllers/user.Controller.js"
import {loginMiddleWare, registerMiddleWare} from "../middlewares/user.middleware.js"

const userRouter = Router()

userRouter.post('/signup', registerMiddleWare, signUp)
userRouter.post('/signin', loginMiddleWare, signIn)

export default userRouter