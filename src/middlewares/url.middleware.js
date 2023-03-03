import { urlSchema } from "../schemas/urlSchema.js";

export async function shortenUrlMiddle(req, res, next) {

    const token = req.headers.authorization?.split('Bearer ')[1];
    const url = { url: req.body.url }

    const { error } = urlSchema.validate(url, { abortEarly: false })


    try {
        if (error) {
            return res.status(422).send("Há um erro com a url")
        }
        
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

    res.locals.url = url.url
    res.locals.token = token
    next()

}

export async function getUrlMiddle(req, res, next) {

    const id = Number(req.params.id)
    console.log(typeof id)

    try {
        if (typeof id !== "number") {
            return res.status(422).send("Há um erro com a id")
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

    res.locals.id = id

    next()
}

export async function openUrlMiddle(req, res, next) {

    const id = Number(req.params.shortUrl)
    console.log(typeof id)

    try {
        if (typeof id !== "number") {
            return res.status(422).send("Há um erro com a shortUrl")
        }

    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

    res.locals.id = id

    next()
}

export async function deleteUrlMiddle(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const id = Number(req.params.id)
    console.log(typeof id)

    try {
        if (typeof id !== "number") {
            return res.status(422).send("Há um erro com a id")
        }
        if (!token) {
            return res.status(401).send('Authorization header is missing');
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

    res.locals.id = id
    res.locals.token = token
    next()
}