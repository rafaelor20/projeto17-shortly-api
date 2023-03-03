import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from "../database/db.js";

export async function signIn (request, response) {

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

export async function signUp (request, response) {
    
    const signUp = res.locals.userSignUp

    try {
        const checkEmail = await db.query(`SELECT cpf FROM users WHERE cpf = $1;`, [signUp.email])

        if (checkEmail){
            res.status(409).send("Já existe um usuário registrado com este email")
        } else {
            const encriptPass = bcrypt.hashSync(signUp.password, 10)

            await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [signUp.name, signUp.email, encriptPass])

            return response.sendStatus(201)
        }        

    } catch(error) {
        return response.send(error).status(500)
    }
}