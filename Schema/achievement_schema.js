import Joi from "joi";

// creating achievment schema

export const achievementSchema = Joi.object({
        awards:Joi.string(),
        description:Joi.string(),
        image:Joi.string(),
        date:Joi.string(),
        nameOfInstitution:Joi.string()
    
    
}) 