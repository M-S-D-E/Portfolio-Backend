
import { Schema, Types, model } from "mongoose";

const educationSchema =  new Schema({
    schoolName: { type: String },
    location: { type: String },
    program: { type: String },
    qualificaion: { type: String },
    grade: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user:{type: Types.ObjectId, ref:'User'}
}
,{
    timestamps:true
})

 export const educationModel = model('Education',educationSchema)