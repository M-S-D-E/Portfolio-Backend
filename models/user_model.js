import { Schema, model ,Types} from "mongoose";


//Defining new User Schema
const userShema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String , unique:true},
        termsAndConditions: { type: Boolean },
        education: [{ type: Types.ObjectId, ref: 'Education' }],
        skills: [{ type: Types.ObjectId, ref: 'Skill' }],
        achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
        projects: [{ type: Types.ObjectId, ref: 'Project' }],
        userProfile: { type: Types.ObjectId, ref: 'UserProfile' },
        volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
        experiences: [{ type: Types.ObjectId, ref: 'Experiences' }],
},{
        timestamps:true
})
export const userModel = model('User', userShema)