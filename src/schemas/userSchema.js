import joi from "joi"

export const userSignUpSchema = joi.object ({
    name: joi.string().required(),
    email: joi.string().email({ tlds: { allow: false } }),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})

export const userSignInSchema = joi.object ({
    email: joi.string().email({ tlds: { allow: false } }),
    password: joi.string().required()
})

