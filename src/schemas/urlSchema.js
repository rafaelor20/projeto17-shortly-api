import joi from "joi"

export const urlSchema = joi.object ({
    url: joi.string().uri().max(250).required()
})