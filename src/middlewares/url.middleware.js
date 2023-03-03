import { urlSchema } from "../schemas/urlSchema.js";

export async function shortenUrlMiddle(req, res, next){
    
    const token = req.headers.authorization?.split('Bearer ')[1];
    const url = {url: req.body.url}
    
    const {error} = urlSchema.validate(url, { abortEarly: false })
    

    try {
        if (error) {
            return res.status(422).send("Há um erro com a url")
        }
        if (!token) {
            return res.status(401).send('Authorization header is missing');
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