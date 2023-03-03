import { customerSchema } from '../schemas/customerSchema.js'

export function customerSchemaValidation(req, res, next) {
    const customer = {
        name: req.body.name,
        phone: req.body.phone,
        cpf: req.body.cpf,
        birthday: req.body.birthday
    }

    const { error } = customerSchema.validate(customer, { abortEarly: false })

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

    res.locals.customer = customer
    next()
}