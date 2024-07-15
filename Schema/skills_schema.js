import Joi from "joi";

export const skillSchema = Joi.object({
    name: Joi.string().required(),
    levelOfProficiency: Joi.string().valid('beginner', 'intermediate', 'advance', 'expert').required(),
})