import Joi from "joi";

export const skillSchema = Joi.object({
    name: Joi.string().required(),
    levelOfProficiency: Joi.string().valid('Beginner', 'Intermediate', 'Advance', 'Expert').required(),
})