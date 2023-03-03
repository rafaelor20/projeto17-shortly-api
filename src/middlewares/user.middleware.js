import {userSignUpSchema, userSignInSchema} from "../schemas/userSchema.js"

export async function loginMiddleWare(req, res, next) {

    const user = {
        email: req.body.email,
        password: req.body.password
    }
    
    const {error} = userSignInSchema.validate(user, { abortEarly: false })
    

    try {
        if (error) {
            const errorMessages = error.details.map(detail => detail.message)
            return res.status(400).send(errorMessages)
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
  
    res.locals.userSignIn = user
    next()
}

export async function registerMiddleWare(req, res, next) {
    
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    
    const {error} = userSignUpSchema.validate(user, { abortEarly: false })

    try {
        if (error || user.password !== user.confirmPassword) {
            
            return res.status(422).send("Há um erro com a info do usuário")
        }
    }
    catch (error) {

        res.status(500).send("Houve um problema no servidor")
    }
  
    res.locals.userSignUp = user
    next()
}