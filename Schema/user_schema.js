import Joi from "joi";

export const userSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    otherName:Joi.string(),
    email:Joi.string().required(),
    passwoord:Joi.string().required(),
    userName:Joi.string(),
    termsAndCondition:Joi.boolean().required(),

})