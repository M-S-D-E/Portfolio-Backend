import { Timestamp } from "mongodb";
import { Schema, model,Types } from "mongoose";


const skillSchema = new Schema({
    name: { type: String },
 levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advance', 'expert'] },
 user:{type: Types.ObjectId, ref:'User'},

        
},
{
    timestamps:true
}
)


export const skillModel = model('Skill',skillSchema)