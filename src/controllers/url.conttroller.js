import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { nanoid } from 'nanoid';
import { db } from "../database/db.js";

export async function shortenUrlControl (req, res){
    const token = res.locals.token
    const url = res.locals.url

    try{
        const users = await db.query(`SELECT * FROM users WHERE password = $1;`,[token])
        console.log(users.rows[0])
        if (users.rowCount === 1){
            const user = users.rows[0]
            const shortUrl = nanoid(10);
            await db.query(`INSERT INTO urls (userId, shortUrl, url) VALUES ($1, $2, $3);`, [user.id, shortUrl, url])
            const id = await db.query(`SELECT id FROM urls WHERE url = $1;`,[url])
            const response = {
                    id: id,
                    shortUrl: shortUrl
            }
            return res.status(201).send(response);
        } else {
            return res.status(401).send('Authorization header is invalid');
        }

    }
    catch(error) {
        return res.send(error).status(500)
    }

}