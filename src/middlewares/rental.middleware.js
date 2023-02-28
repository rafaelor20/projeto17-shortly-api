import { rentalSchema } from "../schema/rentalSchema.js";

export function rentalSchemaValidation(req, res, next) {
    const rental = {
        customerId: req.body.customerId,
        gameId: req.body.gameId,
        daysRented: req.body.daysRented
        //daysRented: Number(req.body.daysRented)
    }

    const { error } = rentalSchema.validate(rental, { abortEarly: false })

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

    res.locals.rental = rental
    next()
}