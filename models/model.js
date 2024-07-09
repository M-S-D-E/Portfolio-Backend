import { Schema, model } from "mongoose";


//Defining new User Schema
const userShema = new Schema({
    user: {
        firstName: { type: String },
        lastName: { type: String },
        otherName: { type: String },
        email: { type: String },
        password: { type: String },
        userName: { type: String, unique: true },
        termsAndConditions: { type: String },
    },

    userProfile: {
        profilePicture: { type: String },
        location: { type: String },
        maritalSatus: { type: String, enum: ['single', 'married', 'prefer-not-to-say'] },
        sex: { type: String, enum: ['male', 'female'] },
        bio: { type: String },
        about: { type: String },
        dateOfBirth: { type: Date, },
        contact: { type: String },
        resume: { type: String },
        languages: [{ type: String }]

    },
    socials: {
        githubLink: { type: String },
        linkedinLink: { type: String },
        twitterLink: { type: String }
    },

    skills:
        [{
            name: { type: String },
            levelOfProfiicincy: { type: String, enum: ['beginner', 'intermedite', 'advance', 'expert'] }
        }
        ],

    experience: [
        {
            companyName: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String },
            startDate: { type: String },
            endDate: { type: String },
        }
    ],


    educaion: [
        {
            schoolName: { type: String },
            location: { type: String },
            program: { type: String },
            qualificaion: { type: String },
            grade: { type: String },
            startDate: { type: String },
            endDate: { type: String },
        }
    ],
    achievement: [
        {
            awards: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            nameOfInstitution: { type: String },

        }
    ],
    project: [
        {
            projectName: { type: String },
            description: { type: String },
            contributors: { type: String },
            skill: { type: String },
            link: { type: String },
            nameOfInstitution: { type: String },
            startDate: { type: String },
            endDate: { type: String },

        }
    ],

    volunteering: [
        {
            organization: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String },
            projectName: { type: String }


        }
    ],

})
export const User = model('user', userShema)