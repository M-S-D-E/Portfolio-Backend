import { Schema, model } from "mongoose";


//Defining new User Schema
const userShema = new Schema({
   
        firstName: { type: String },
        lastName: { type: String },
        otherName: { type: String },
        email: { type: String },
        password: { type: String },
        userName: { type: String, unique: true },
        termsAndConditions: { type:Boolean }
},{
        timestamps:true
})
export const user = model('User', userShema)