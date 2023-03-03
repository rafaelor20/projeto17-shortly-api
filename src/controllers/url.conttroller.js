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
            return res.status(200).send(url);
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
        const urls = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
        if (urls.rowCount > 0) {
            const url = urls.rows[0]
            return res.status(200).send(url.shortUrl);
        } else {
            return res.status(401).send("Url does not exist");
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}