import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { nanoid } from 'nanoid';
import { db } from "../database/db.js";

export async function shortenUrlControl(req, res) {
    const token = res.locals.token
    const url = res.locals.url

    try {
        const users = await db.query(`SELECT * FROM users WHERE password = $1;`, [token])

        if (users.rowCount > 0) {

            const shortUrl = nanoid(10);

            await db.query(`INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3);`, [users.rows[0].id, shortUrl, url])
            const idObject = await db.query(`SELECT id FROM urls WHERE "shortUrl" = $1;`, [shortUrl])

            const response = {
                id: idObject.rows[0].id,
                shortUrl: shortUrl
            }
            return res.status(201).send(response);
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
            return res.status(401).send("Url does not exist");
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
        const urls = await db.query(`SELECT * FROM urls WHERE "id" = $1;`, [id])
        console.log(urls.rows)
        if (urls.rowCount > 0) {
            const url = urls.rows[0]
            const visitCount = url.visitCount + 1
            await db.query(`UPDATE urls SET "visitCount"=$1  WHERE "id" = $1;`, [visitCount])
            return res.status(201).send(url.url);
        } else {
            return res.status(401).send("Url does not exist");
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

        const users = await db.query(`SELECT * FROM users WHERE password = $1;`, [token])

        if (users.rowCount > 0) {
            const user = users.rows[0]
            const urls = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
            if (urls.rowCount > 0) {
                const url = urls.rows[0]

                if (user.id === url.userId) {
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