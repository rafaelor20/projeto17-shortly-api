import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from "../database/db.js";

export async function signIn(req, res) {

    const signIn = res.locals.userSignIn

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [signIn.email])
        console.log(user)
        if (user.rowCount !== 0) {
            if (bcrypt.compareSync(signIn.password, user.rows[0].password)) {
                const token = uuid()

                res.status(200).send({ token: token })
            }
            else {
                return res.status(401).send('Unauthorized')
            }
        } else {
            return res.status(401).send('Unauthorized')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function signUp(req, res) {

    const signUp = res.locals.userSignUp

    try {

        const checkEmail = await db.query(`SELECT email FROM users WHERE email = $1;`, [signUp.email])

        if (checkEmail.rowCount > 0) {

            res.status(409).send("Já existe um usuário registrado com este email")
        } else {
            const encriptPass = bcrypt.hashSync(signUp.password, 10)

            await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [signUp.name, signUp.email, encriptPass])

            return res.sendStatus(201)
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function getUserControl(req, res) {
    const token = res.locals.token

    try {
        
        const users = await db.query(`SELECT * FROM users WHERE password = $1;`, [token])
        
        if (users.rowCount > 0) {
            const user = users.rows[0]
            const urls = await db.query(`SELECT * FROM urls WHERE "userId" = $1;`, [user.id])
            const visitCount = await sumVisits(urls.rows)
            const response = {
                "id": user.id,
                "name": user.name,
                "visitCount": visitCount,
                "shortenedUrls": urls.rows
            }
            return res.status(200).send(response);
        } else {
            return res.status(401).send('Auth is invalid');
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}

function sumVisits(arr){
    let sum = 0
    for (let i = 0; i<arr.length; i++ ){
        sum = sum + arr.visitCount
    }
    return sum
}