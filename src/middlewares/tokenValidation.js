import db from "../database/db.js"
import { ObjectId } from "mongodb"

export default async function tokenValidationMiddleware(req, res, next) {
    
    const { authorization } = req.headers
    if(!authorization) return res.sendStatus(401)

    const token = authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).send('Unauthorized sem token')
    }
  
    const session = await db.collection('sessions').findOne({ token })
    
    if (!session) {
      return res.status(401).send('Unauthorized token nao existe')
    }
  
    const user = await db.collection('users').findOne({ _id: session.userId })
    if (!user) {
      return res.status(401).send('Unauthorized user nao encontrado')
    }

    res.locals.session = session
    res.locals.user = user
    next()

  }