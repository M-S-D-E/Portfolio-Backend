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

// Update a project
export const updateProject = async (req, res) => {
    try {
        const { error, value } = project.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const deletedProject = await projectModel.findByIdAndUpdate(
            req.params.projectId,
            value,
            { new: true }
        );

        if (!deletedProject) {
            return res.status(404).send('Project not found');
        }

        res.status(201).json({ project: deletedProject });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete  project
export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await projectModel.findByIdAndDelete(req.params.projectId);

        if (!deletedProject) {
            return res.status(404).send('Project not found');
        }

        // Remove project from user
        const user = await user.findById(deletedProject.user);
        if (user) {
            user.project = user.project.filter(projectId => projectId.toString() !== req.params.projectId);
            await user.save();
        }

        res.status(201).json({ project: deletedProject });
    } catch (error) {
        res.status(500).send(error);
    }
};
