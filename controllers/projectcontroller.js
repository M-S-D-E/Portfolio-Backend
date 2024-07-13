import { projectModel } from "../models/projectModel.js";
import { userModel } from "../models/user_model.js";
import { projectSchema } from "../Schema/projectSchema.js";

export const addProject = async (req, res) => {
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Create project with the validated data
        const newProject = await projectModel.create(value);

        // Find the user with the ID passed when creating the project
        const userId = req.session.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Push the new project ID to the user's projects array
        user.projects.push(newProject._id);  
        await user.save();

        // Return the newly created project
        res.status(201).json({ project: newProject });
    } catch (error) {
        console.error('Error adding project:', error);
        return res.status(500).send(error.message);
    }
};

// Get all projects
export const allProjects = async (req, res) => {
    try {
        const allProjects = await projectModel.find();
        if (allProjects.length === 0) {
            return res.status(404).send('No projects found');
        }
        res.status(200).json({ projects: allProjects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send(error.message);
    }
};

// Get a single project by ID
export const getProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).send('Project not found');
        }
        res.status(200).json({ project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).send(error.message);
    }
};

// Update a project
export const updateProject = async (req, res) => {
    try {
        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updatedProject = await projectModel.findByIdAndUpdate(
            req.params.projectId,
            value,
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).send('Project not found');
        }

        res.status(200).json({ project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).send(error.message);
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await projectModel.findByIdAndDelete(req.params.projectId);

        if (!deletedProject) {
            return res.status(404).send('Project not found');
        }

        // Remove project reference from user
        const user = await userModel.findById(deletedProject.user);
        if (user) {
            user.projects = user.projects.filter(projectId => projectId.toString() !== req.params.projectId);
            await user.save();
        }

        res.status(200).json({ project: deletedProject });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).send(error.message);
    }
};
