import { Timestamp } from "mongodb";
import { Schema, model,Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const skillSchema = new Schema({
    name: { type: String },
 levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advance', 'expert'] },
 user:{type: Types.ObjectId, ref:'User'},

        
},
{
    timestamps:true
})

skillSchema.plugin(toJSON);
export const skillModel = model('Skill',skillSchema)