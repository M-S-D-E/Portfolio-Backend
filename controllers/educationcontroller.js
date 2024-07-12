import { education, educationModel } from "../models/educationModel.js";
import { user } from "../models/user_model.js";
import { education } from "../Schema/education_Schema.js";

export const addEducation = async (req, res) => {

    try {

        const { error, value } = education.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }


        //    create education with the value
        const education = await educationModel.create(value);

        //  after, find user with the id passed when creating the education
        const User = await user.findById(value, user);
        if (!user) {
            return res.status(404).send('user not found');
        }

        // if you find the user , push the education id you just created inside
        user.education.push(education._id);

        // and save the user now with the education id
        await user.save();

        // return the education
        res.status(201).json({ education });

    } catch (error) {
        return res.status(500).send(error)
    }
}



// Get all education
export const getallEducation = async (req, res) => {
    try {
        // we are fetching education that belongs to a particular user
        const userId = req.params.id

        const allEducation = await educationModel.find({ user: userId })

        if (allEducation.length == 0) {
            return res.status(404).send('No Education added')
        }

        res.status(200).json({ education: allEducation })
    } catch (error) {

    }
};

// Get A Single education by ID
export const getEducation = async (req, res) => {
    const education = await educationModel.findById(req.params.id)

    res.status(200).json(education)
};

// Update an education
export const updateEducation = async (req, res, next) => {
    try {
        const { error, value } = education.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        const education = await educationModel.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(education)
        }
    } catch (error) {
        next(error)
    }

}


// delete an education

export const deleteEducation = async (req, res, next) => {
    try {
        const deleteData = await educationModel.findByIdandDelete(req.params.id)
        {
            res.status(200).json(deleteData)
            console.log(`education with the ID:${req.params.id}has been deleted`)
        }
    } catch (error) {
        next(error)
    }

}