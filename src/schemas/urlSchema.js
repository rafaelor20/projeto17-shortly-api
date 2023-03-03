import joi from "joi"

export const urlSchema = joi.object ({
    url: joi.string().max(250).required(),
})