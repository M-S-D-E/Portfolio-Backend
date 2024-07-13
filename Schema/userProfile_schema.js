import Joi from "joi";

export const userProfileSchema = Joi.object({
    
        profilePicture:Joi.string().required(),
        location:Joi.string().required(),
        maritalStatus:Joi.string().valid('single', 'married', 'prefer-not-to-say').required(),
        sex: Joi.string().valid('male', 'female').required(),
        bio:Joi.string(),
        about: Joi.string(),
        dateOfBirth:Joi.string(),
        contact: Joi.string(),
        resume:Joi.string(),
        languages:Joi.string(),
        githubLink:Joi.string(),
        linkedinLink:Joi.string(),
        twitterLink:Joi.string(),
        user: Joi.string().required()
})
