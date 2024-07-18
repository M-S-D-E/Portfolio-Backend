import { experienceModel } from "../models/experienceModel.js";
import { userModel } from "../models/user_model.js";
import { experienceSchema} from "../Schema/experince_Schema.js"; // Renamed to avoid confusion

// Add new experience
export const addExperience = async (req, res) => {
    try {
        const { error, value } = experienceSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Find the user and associate the experience
        const id = req.session?.user?.id || req?.user?.id; // Assuming user ID is stored in session
        // Assuming user ID is stored in session
        const user = await userModel.findById(id); // Fetch user using session ID
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Create experience with the validated data
        const newExperience = await experienceModel.create({...value,user:user.id});

        // Push the new experience ID to the user's experiences array
        user.experiences.push(newExperience._id);
        await user.save();
        // Return the newly created experience
        res.status(201).json({ experience: newExperience });
    } catch (error) {
        console.error('Error adding experience:', error);
        res.status(500).send(error.message);
    }
};


// Get all experiences
export const allExperiences = async (req, res) => {
    try {
        const userId = req.session?.user?.id || req?.user?.id;
      if (!userId) {
          return res.status(401).send('Unauthorized: User ID is missing');
      }
        const allExperiences = await experienceModel.find({ user: userId });
        if (allExperiences.length === 0) {
            return res.status(404).send('No experiences found');
        }
        res.status(200).json({ experiences: allExperiences });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).send(error.message);
    }
};

// Get a single experience by ID
export const getExperience = async (req, res) => {
    try {
        const userId = req.session?.user?.id || req?.user?.id;
        if (!userId) {
            return res.status(401).send('Unauthorized: No user ID found in session or token');
        }
        const experience = await experienceModel.findOne({ _id: req.params.id, user: userId })
        if (!experience) {
            return res.status(404).send('Experience not found');
        }
        res.status(200).json({ experience });
    } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).send(error.message);
    }
};

// Update an experience
export const updateExperience = async (req, res) => {
    try {
        const { error, value } = experienceSchema.validate(req.body);
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

        res.status(200).json({ experience: updatedExperience });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).send(error.message);
    }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
    try {
        const deletedExperience = await experienceModel.findByIdAndDelete(req.params.experienceId);

        if (!deletedExperience) {
            return res.status(404).send('Experience not found');
        }

        // Remove experience reference from user
        const user = await userModel.findById(deletedExperience.user);
        if (user) {
            user.experiences = user.experiences.filter(expId => expId.toString() !== req.params.experienceId);
            await user.save();
        }

        res.status(200).json({ experience: deletedExperience });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).send(error.message);
    }
};
