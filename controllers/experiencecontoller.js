import { experience, experienceModel } from "../models/experienceModel.js";
import { user } from "../models/user_model.js";
import { experience } from "../Schema/experince_Schema.js";

export const addExperience = async (req, res) => {
    try {

        const { error, value } = experience.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)

        }
        // create experience with the value
        const experience = await experienceModel.create(value);

        // after,find the user with the id that you passed when creating the experience 
        const User = await user.findById(value.user);
        if (!user) {
            return res.status(404).send('user not found');
        }

        // if you find the user,push the experience id you just created inside
        user.experience.push(experience._id);

        // and save user now with the experience
        await user.save();

        // return the experience
        res.status(201).json({ experience });

    } catch (error) {
        return res.status(500).send(error)
    }

}

// Get all experiences
export const allExperiences = async (req, res) => {
    try {
        // we are fetching experience that belongs to a particular user
        const userId = req.params.id
        const allExperiences = await experienceModel.find()
        if (allExperiences.length == 0) {
            return res.status(404).send('No Experience added')
        }

        res.status(200).send({ experience: allExperiences })
    } catch (error) {

    }
};

// Get A Single experience by ID
export const getExperience = async (req, res, next) => {

    const experience = await experienceModel.findById(req.params.id)

    res.status(200).json(experience)
};

// Update an experience
export const updateExperience = async (req, res, next) => {
    try {
        const { error, value } = experience.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        const experience = await experienceModel.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(experience)
        }
    } catch (error) {
        next(error)
    }

}


// delete an experience

export const deleteExperience = async (req, res, next) => {
    try {
        const deleteData = await experienceModel.findByIdandDelete(req.params.id)
        {
            res.status(200).json(deleteData)
            console.log(`experience with the ID:${req.params.id}has been deleted`)

        }
    } catch (error) {
        next(error)
    }

}