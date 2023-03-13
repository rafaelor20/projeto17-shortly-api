import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { nanoid } from 'nanoid';
import { db } from "../database/db.js";

export async function shortenUrlControl(req, res) {
    const token = res.locals.token
    const url = res.locals.url

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        
        if (session.rowCount > 0) {

            const shortUrl = nanoid(10);

            const shortId = await db.query(`INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3) RETURNING id;`, [session.rows[0].userId, shortUrl, url])
            
            console.log(shortId)
            const data = {
                id: shortId.rows[0].id,
                shortUrl: shortUrl
            }
            return res.status(201).send(data);
        } else {
            return res.status(401).send('Authorization header is invalid');
        }

    }
    catch (error) {
        return res.send(error).status(500)
    }

}

export async function getUrlControl(req, res, next) {

    const id = res.locals.id

    try {
        const urls = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
        if (urls.rowCount > 0) {
            const url = urls.rows[0]
            return res.status(201).send(url);
        } else {
            return res.status(422).send("Url does not exist");
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}

export async function openUrlControl(req, res, next) {

    const id = res.locals.id

    try {
        const urls = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [id])
        console.log(urls.rows)
        if (urls.rowCount > 0) {
            const url = urls.rows[0]
            const visitCount = url.visitCount + 1
            await db.query(`UPDATE urls SET "visitCount"=$1  WHERE "shortUrl" = $2;`, [visitCount, id])
            return res.status(201).send(url.url);
        } else {
            return res.status(422).send("Url does not exist");
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}

export async function deleteUrlControl(req, res, next) {

    const id = res.locals.id
    const token = res.locals.token
    try {

        const sessions = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])

        if (sessions.rowCount > 0) {
            const session = sessions.rows[0]
            const urls = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
            if (urls.rowCount > 0) {
                const url = urls.rows[0]

                if (session.id === url.userId) {
                    await db.query(`DELETE FROM urls WHERE id=$1;`, [id])
                    return res.status(204).send("OK");
                } else {
                    return res.status(401).send('Authorization header is invalid');
                }


            } else {
                return res.status(404).send("Url does not exist");
            }
        } else {
            return res.status(401).send('Authorization header is invalid');
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}