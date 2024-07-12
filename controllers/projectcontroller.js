import { projectModel } from "../models/projectModel.js";
import { user } from "../models/user_model.js";
import { project } from "../Schema/projectSchema.js";

export const addProject = async (req, res) => {

    try {
        const { error, value } = project.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // create project with the value
        const project = await projectModel.create(value);

        //  after,find the user with the id that you passed when creating the project
        const User = await user.findById(value.user);
        if (!user) {
            return res.status(404).send('user not found');
        }

        // if you find the user,push the project id you just created inside
        user.project.push(project._id);

        // and save the user now with the project
        await user.save();

        // return the project
        res.status(201).json({ project });

    } catch (error) {
        return res.status(500).send(error)
    }

}

// Get all projects
export const allProject = async (req, res) => {
    try {
        // we are fetching project that belongs to a particular user
        const userId = req.params.id
        const allProject = await projectModel.find()
        if (allProject.length == 0) {
            return res.status(404).send('No Project added')
        }

        res.status(200).json({ project: allProject })
    } catch (error) {

    }
};

// Get A Single project by ID
export const getProject = async (req, res, next) => {

    const project = await projectModel.findById(req.params.id)

    res.status(200).json(project)
};

// Update an project
export const updateProject = async (req, res, next) => {
    try {
        const { error, value } = project.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        const Project = await projectModel.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(Project)
        }
    } catch (error) {
        next(error)
    }

}


// delete a project

export const deleteProject = async (req, res, next) => {
    try {
        const deleteData = await projectModel.findByIdandDelete(req.params.id)
        {
            res.status(200).json(deleteData)
            console.log(`project with the ID:${req.params.id}has been deleted`)
        }
    } catch (error) {
        next(error)
    }

}