import { gameSchema } from "../schemas/gameSchema.js"

export function gameSchemaValidation(req, res, next) {
    const game = {
        name: req.body.name,
        image: req.body.image,
        stockTotal: Number(req.body.stockTotal),
        pricePerDay: Number(req.body.pricePerDay)
    }

    const { error } = gameSchema.validate(game, { abortEarly: false })

    try {
        if (error) {
            const errorMessages = error.details.map(detail => detail.message)
            return res.status(400).send(errorMessages)
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

    res.locals.game = game
    next()
}