import Joi from "joi";

export const skill = Joi.object({
    name:Joi.string().required(),
    levelOfProficiency:Joi.string().valid('beginner','intermediate', 'advance', 'expert').required(),
})