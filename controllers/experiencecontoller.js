import { experience, experienceModel } from "../models/experienceModel.js";
import { user, user } from "../models/user_model.js";
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
export const updateExperience = async (req, res) => {
    try {
        const { error, value } = experience.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updatedExperience = await experienceModel.findByIdAndUpdate(
            req.params.experienceId,
            value,
            { new: true }
        );

        if (!updatedExperience) {
            return res.status(404).send('Experience not found');
        }

        res.status(201).json({ experience: updatedExperience });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete  experience
export const deleteExperience = async (req, res) => {
    try {
        const deletedExperience = await experienceModel.findByIdAndDelete(req.params.experienceId);

        if (!deletedExperience) {
            return res.status(404).send('Experience not found');
        }

        // Remove experience reference from user
        const user = await user.findById(deletedExperience.user);
        if (user) {
            user.experience = user.experience.filter(experienceId => experienceId.toString() !== req.params.experienceId);
            await user.save();
        }

        res.status(201).json({ experience: deletedExperience });
    } catch (error) {
        res.status(500).send(error);
    }
};
