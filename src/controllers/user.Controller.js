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
        return res.send(error).status(500)
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
        return res.send(error).status(500)
    }
}

export async function deleteUserControl(req, res) {
    const token = res.locals.token

    try {
        const users = await db.query(`SELECT * FROM users WHERE password = $1;`, [token])
        if (users.rowCount > 0) {
            await db.query(`DELETE FROM users WHERE token=$1;`, [token])
            return res.status(204).send("OK");
        } else {
            return res.status(401).send('Authorization header is invalid');
        }

    } catch (error) {
        return res.send(error).status(500)
    }
}