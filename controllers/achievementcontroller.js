import { achievement, achievementModel } from "../models/acheivementModel.js";
import { user } from "../models/user_model.js";
import { achievement } from "../Schema/achievement_schema.js";

export const addAchievement = async (req, res) => {

  try {
    const { error, value } = achievement.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    // create achievement with the value
    const achievement = await achievementModel.create({
      ...req.body,
      Banner: req.file.filename
    });
    //  after, find user with the id passed when creating the achievement
    const User = await user.findById(value, user);
    if (!user) {
      return res.status(404).send('user not found')
    }

    //  if you find the user,push the achievement id you just created inside
    user.achievement.push(achievement._id);

    // and save the user now with the achievementid
    await user.save();

    // return the achievement
    res.status(201).json({ achievement });

  } catch (error) {
    return res.status(500).send(error)
  }

};

// Get all achievements
export const allAchievements = async (req, res, next) => {
  try {
    // we are fetching achievement that belongs to a particular user
    const userId = req.params.id
    const allAchievements = await achievementModel.find({ user: userId })
    if (allAchievements.length == 0) {
      return res.status(404).send('No Achievement added')
    }
    res.status(200).json({ achievement: allAchievements })
  } catch (error) {

  }
};


// Get A Single achievement by ID
export const getAchievement = async (req, res) => {
  const achievement = await achievementModel.findById(req.params.id)

  res.status(200).json(achievement)
}


// Update an achievement
export const updateAchievement = async (req, res) => {
  try {
    const { error, value } = achievementSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedAchievement = await achievementModel.findByIdAndUpdate(
      req.params.achievementId,
      value,
      { new: true }
    );

    if (!updatedAchievement) {
      return res.status(404).send('Achievement not found');
    }

    res.status(201).json({ achievement: updatedAchievement });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete  achievement
export const deleteAchievement = async (req, res) => {
  try {
    const updatedAchievement = await achievementModel.findByIdAndDelete(req.params.achievementId);

    if (!updatedAchievement) {
      return res.status(404).send('Achievement not found');
    }

    // Remove achievement reference from user
    const user = await user.findById(updatedAchievement.user);
    if (user) {
      user.achievement = user.achievement.filter(achievementId => achievementId.toString() !== req.params.achievementId);
      await user.save();
    }

    res.status(201).json({ achievement: updatedAchievement });
  } catch (error) {
    res.status(500).send(error);
  }
};
