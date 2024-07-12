import Joi from "joi";

export const userSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    userName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(4).required(),
    confirmedPassword: Joi.ref('password'),
    userName:Joi.string(),
    termsAndCondition:Joi.boolean(),

}).with('password', 'confirmedPassword');

