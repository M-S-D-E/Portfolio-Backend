import { Schema, model, Types} from "mongoose";


const userProfile = new Schema({
    profilePicture: { type: String },
    location: { type: String },
    maritalSatus: { type: String, enum: ['single', 'married', 'prefer-not-to-say'] },
    sex: { type: String, enum: ['male', 'female'] },
    bio: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date, },
    contact: { type: String },
    resume: { type: String },
    languages: [{ type: String }],
    githubLink: { type: String },
    linkedinLink: { type: String },
    twitterLink: { type: String },
    user:{type: Types.ObjectId, ref:'User'}
},{
    timestamps:true
})

export const profileModel = model('Profile',userProfile)