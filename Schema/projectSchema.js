import Joi from "joi"

export const project = Joi.object({
        projectName:Joi.string(),
        description:Joi.string(),
        contributors:Joi.string(),
        skill:Joi.string(),
        link:Joi.string(),
        nameOfInstitution:Joi.string(),
        startDate:Joi.string(),
        endDate:Joi.string(),
    
    })