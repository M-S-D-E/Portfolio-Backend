import { volunteer, volunteeringModel } from "../models/volunteeringModel.js";
import { user } from "../models/user_model.js";
import { volunteer } from "../Schema/volunteeringSchema.js";

export const addVolunteer = async (req, res) => {

    try {
        const { error, value } = volunteer.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // create volunteer with the value
        const volunteer = await volunteeringModel.create(value);

        //  after,find the user with the id that you passed when creating the volunteer
        const User = await user.findById(value.user);
        if (!user) {
            return res.status(404).send('user not found');
        }

        // if you find the user,push the volunteer id you just created inside
        user.volunteer.push(volunteer._id);

        // and save the user now with the volunteer
        await user.save();

        // return volunteer
        res.status(201).json({ volunteer });

    } catch (error) {
        return res.status(500).send(error)
    }

}

// Get all volunteer
export const allVolunteer = async (req, res) => {
    try {
        // we are fetching volunteer that belongs to a particular user
        const userId = req.params.id
        const allVolunteer = await volunteeringModel.find()
        if (allVolunteer.length == 0) {
            return res.status(404).send('No Volunteer added')
        }

        res.status(200).json({ volunteer: allVolunteer })
    } catch (error) {

    }
};

// Get A Single volunteer by ID
export const getVolunteer = async (req, res) => {

    const volunteer = await volunteeringModel.findById(req.params.id)

    res.status(200).json(project)
};

// Update an volunteer
export const updateVolunteer = async (req, res, next) => {
    try {
        const { error, value } = volunteer.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        console.log('value', value)
        const volunteer = await volunteeringModel.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(volunteer)
        }
    } catch (error) {
        next(error)
    }

}


// delete an volunteer

export const deleteVolunteer = async (req, res, next) => {
    try {
        const deleteData = await volunteeringModel.findByIdandDelete(req.params.id)
        {
            res.status(200).json(deleteData)
            console.log(`volunteer with the ID:${req.params.id}has been deleted`)
        }
    } catch (error) {
        next(error)
    }

}