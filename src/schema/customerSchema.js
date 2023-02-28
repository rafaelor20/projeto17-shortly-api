
import coreJoi from "joi"
import joiDate from "@joi/date";

const joi = coreJoi.extend(joiDate) 

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(11).max(11).pattern(/^[0-9]+$/).required(),
    cpf: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    birthday: joi.date().format("YYYY-MM-DD")
})

