import { Router } from "express"
import { signIn, signUp, getUserControl } from "../controllers/user.Controller.js"
import {loginMiddleWare, registerMiddleWare, getUserMiddleWare} from "../middlewares/user.middleware.js"

const userRouter = Router()

userRouter.post('/signup', registerMiddleWare, signUp)
userRouter.post('/signin', loginMiddleWare, signIn)
userRouter.get("/users/me", getUserMiddleWare, getUserControl)

export default userRouter