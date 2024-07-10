import Joi from "joi";

export const education = Joi.object({
     schoolName:Joi.string().required(),
     location:Joi.string(),
     program:Joi.string().required(),
  qualification:Joi.string().required(),
  grade:Joi.string(),
  startDate:Joi.string(),
  endDate:Joi.string(),

})