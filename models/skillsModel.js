import { Schema, model,Types } from "mongoose";


const skillSchema = new Schema({
    name: { type: String },
 levelOfProfiicincy: { type: String, enum: ['beginner', 'intermedite', 'advance', 'expert'] },
 user:{type: Types.ObjectId, ref:'User'},

        
})


export const skillModel = model('Skill',skillSchema)