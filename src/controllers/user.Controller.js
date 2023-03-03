import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from "../database/db.js";

export async function signIn (req, res) {

    const signIn = res.locals.userSignIn
    
    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [signIn.email])

        if(bcrypt.compareSync(user.password, signIn.password)) {
            const token = uuid()
            response.send({token, name:user.name})
        } else {
            return response.status(401).send('Unauthorized')
        }
    } catch(error) {
        return response.send(error).status(500)
    }
}

export async function signUp (req, res) {
    
    const signUp = res.locals.userSignUp
    console.log(signUp)
    try {
        
        const checkEmail = await db.query(`SELECT email FROM users WHERE email = $1;`, [signUp.email])
        
        if (checkEmail.rowCount !== 0){
            console.log("Já existe um usuário registrado com este email")
            res.status(409).send("Já existe um usuário registrado com este email")
        } else {
            const encriptPass = bcrypt.hashSync(signUp.password, 10)
            console.log(typeof encriptPass)
            console.log("else")
            await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [signUp.name, signUp.email, encriptPass])

            return res.sendStatus(201)
        }        

    } catch(error) {
        return res.send(error).status(500)
    }
}