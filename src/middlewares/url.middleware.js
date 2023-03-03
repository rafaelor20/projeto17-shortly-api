import { urlSchema } from "../schemas/urlSchema";

export async function shortenUrlMiddle(req, res, next){
    const { headers } = req;
    const token = headers.authorization?.split('Bearer ')[1];

    const url = req.body.url

    const {error} = urlSchema.validate(user, { abortEarly: false })

    try {
        if (error) {
            return res.status(422).send("Há um erro com a info do usuário")
        }
        if (!token) {
            return res.status(401).send('Authorization header is missing');
          }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
  
    res.locals.url = url
    res.locals.toekn = token
    next()

}