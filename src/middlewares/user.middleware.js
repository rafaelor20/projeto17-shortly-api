import {userSignUpSchema, userSignInSchema} from "../schemas/userSchema.js"

export async function loginMiddleWare(req, res, next) {

    const user = {
        email: req.body.email,
        password: req.body.password
    }
    
    const {error} = userSignInSchema.validate(user, { abortEarly: false })
    

    try {
        if (error) {
            return res.status(422).send("Há um erro com a info do usuário")
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

export async function getUserMiddleWare(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1]
    
    try {
        
        if (!token) {
            return res.status(401).send('Authorization header is missing');
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
    
    res.locals.token = token
    next()
}