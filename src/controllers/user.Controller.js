import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from "../database/db.js";

export async function signIn(req, res) {

    const signIn = res.locals.userSignIn

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [signIn.email])
        
        if (user.rowCount > 0) {
            if ((signIn.password === user.rows[0].password)) {
                const token = uuid()
                await db.query(
                    `
                 INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
                    [token, user.rows[0].id]
                  );
                res.status(200).send({ token: token })
            }
            
            else {
                console.log(signIn.password)
                console.log(user.rows[0].password)
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

            await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [signUp.name, signUp.email, signUp.password])

            return res.sendStatus(201)
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function getUserControl(req, res) {
    const token = res.locals.token

    try {
        
        const sessions = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        console.log(sessions.rows[0])
        if (sessions.rowCount > 0) {
            const session = sessions.rows[0]
            const urls = await db.query(`SELECT * FROM urls WHERE "userId" = $1;`, [session.userId])
            const users =  await db.query(`SELECT * FROM users WHERE id = $1;`, [session.userId])
            const user = users.rows[0]
            
            const visitCount = sumVisits(urls.rows)
            const formatedUrls = formatUrls(urls.rows)
            const response = {
                "id": user.id,
                "name": user.name,
                "visitCount": visitCount,
                "shortenedUrls": formatedUrls
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
        sum = sum + arr[i].visitCount
    }
    return sum
}

function formatUrls(arr){
    let lst = []
    for (let i = 0; i<arr.length; i++ ){
        lst.push({
            id: arr[i].id,
			shortUrl: arr[i].shortUrl,
			url: arr[i].url,
			visitCount: arr[i].visitCount
        })
    }
    return lst
}