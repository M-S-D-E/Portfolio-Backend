import { Schema, model,Types } from "mongoose";

const projectSchema = new Schema ({
    projectName: { type: String },
    description: { type: String },
    contributors: { type: String },
    skill: { type: String },
    link: { type: String },
    nameOfInstitution: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user:{type: Types.ObjectId, ref:'User'}
},{
    timestamps:true
})

export const projectModel = model('Project',projectSchema)