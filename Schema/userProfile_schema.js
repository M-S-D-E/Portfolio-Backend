import Joi from "joi";

export const userProfileSchema = Joi.object({
    userProfile:{
        profilePicture:Joi.string().required(),
        location:Joi.string().required(),
        maritalSatus:Joi.string(),
        sex: Joi.string(),
        bio:Joi.string(),
        about: Joi.string(),
        dateOfBirth:Joi.string(),
        contact: Joi.string(),
        resume:Joi.string(),
        languages:Joi.string(),
    }
})


// creating achievment schema

export const userAchievement = Joi.object({
    achievement:{
        awards:Joi.string(),
        description:Joi.string(),
        image:Joi.string(),
        date:Joi.string(),
        nameOfInstitution:Joi.string()
    }
    
})

export const userProject = Joi.object({
    Project:{
        projectName:Joi.string(),
        description:Joi.string(),
        contributors:Joi.string(),
        skill:Joi.string(),
        link:Joi.string(),
        nameOfInstitution:Joi.string(),
        startDate:Joi.string(),
        endDate:Joi.string(),
    },

    volunteering: {
        organization: Joi.string(),
        description: Joi.string(),
        skills:  Joi.string(),
        startDate: Joi.string(),
        endDate: Joi.string(),
        role:  Joi.string(),
        responsibility: Joi.string(),
        location:  Joi.string(),
        projectName: Joi.string()


    }
})
