
import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const educationSchema =  new Schema({
    schoolName: { type: String },
    location: { type: String },
    program: { type: String },
    qualification: { type: String },
    grade: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user:{type: Types.ObjectId, ref:'User'}
}
,{
    timestamps:true
})

educationSchema.plugin(toJSON);
 export const educationModel = model('Education',educationSchema) 