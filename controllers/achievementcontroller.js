import { achievementModel } from "../models/achievementModel.js";
import { userModel } from "../models/user_model.js";
import { achievementSchema } from "../Schema/achievement_schema.js";

export const addAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate({
      ...req.body,
      awards:req.files.awards[0].filename,
      image:req.files.image[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newAchievement = await achievementModel.create({
      ...value,
     image: req.file.filename
    });

    const userId = req.session.user.id; // Assuming user ID is stored in session
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.achievements.push(newAchievement._id);
    await user.save();

    res.status(201).json({ achievement: newAchievement });
  } catch (error) {
    console.error('Error adding achievement:', error);
    res.status(500).send(error.message);
  }
};

// Get all achievements
export const allAchievements = async (req, res) => {
  try {
    const userId = req.params.id;
    const allAchievements = await achievementModel.find({ user: userId });
    if (allAchievements.length === 0) {
      return res.status(404).send('No achievements added');
    }
    res.status(200).json({ achievements: allAchievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).send(error.message);
  }
};

// Get a single achievement by ID
export const getAchievement = async (req, res) => {
  try {
    const achievement = await achievementModel.findById(req.params.id);
    if (!achievement) {
      return res.status(404).send('Achievement not found');
    }
    res.status(200).json(achievement);
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).send(error.message);
  }
};

// Update an achievement
export const updateAchievement = async (req, res) => {
  try {
    // Validate incoming request body against achievement schema
    const { error, value } = achievementSchema.validate({
      ...req.body,
      awards:req.files.awards[0].filename,
      image:req.files.image[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Update achievement document in the database
    const updatedAchievement = await achievementModel.findByIdAndUpdate(
      req.params.achievementId, 
      value, 
      { new: true } 
    );

    // Handle case where no achievement was found with the given ID
    if (!updatedAchievement) {
      return res.status(404).send('Achievement not found');
    }

    // Send updated achievement as JSON response
    res.status(200).json({ achievement: updatedAchievement });
  } catch (error) {
    // Handle any unexpected errors and send 500 Internal Server Error
    console.error('Error updating achievement:', error);
    res.status(500).send(error.message);
  }
};

// Delete an achievement
export const deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await achievementModel.findByIdAndDelete(req.params.achievementId);

    if (!deletedAchievement) {
      return res.status(404).send('Achievement not found');
    }

    const user = await userModel.findById(deletedAchievement.user);
    if (user) {
      user.achievements = user.achievements.filter(achievementId => achievementId.toString() !== req.params.achievementId);
      await user.save();
    }

    res.status(200).json({ message: 'Achievement deleted successfully', achievement: deletedAchievement });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).send(error.message);
  }
};
