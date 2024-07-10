import Joi from "joi";

// creating achievment schema

export const userAchievement = Joi.object({
        awards:Joi.string().required(),
        description:Joi.string(),
        image:Joi.string(),
        date:Joi.string(),
        nameOfInstitution:Joi.string()
    
    
}) 