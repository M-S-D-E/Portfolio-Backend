import { user } from "../models/user_model.js";
import { userSchema } from "../Schema/user_schema.js";



// creating a Post method
 export const signup = (req,res,) =>{
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
 }