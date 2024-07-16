import { skillModel } from "../models/skillsModel.js";
import { userModel } from "../models/user_model.js"; // Ensure correct naming
import { skillSchema } from "../Schema/skills_schema.js";

export const addSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body); // Use skillSchema
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // Create skill with the value
    const skill = await skillModel.create(value);

    // Find the user with the id that you passed when creating the skill
    const id = req.session?.user?.id || req?.user?.id
    const user = await userModel.findById(id); // Use userModel
    if (!user) {
      // console.log(`User not found for ID: ${userId}`);
      return res.status(404).send('User not found');
    }

    // If you find the user, push the skill id you just created inside
    user.skills.push(skill._id); // Use skills instead of skill
    await user.save();

    // Return the skill
    res.status(201).json({ skill });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).send(error.message);
  }
};

// Get all skills
export const allSkills = async (req, res) => { // Renamed to allSkills
  try {
    const allSkills = await skillModel.find();
    if (allSkills.length === 0) {
      return res.status(404).send('No skills added');
    }
    res.status(200).json({ skills: allSkills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).send(error.message);
  }
};

// Get a single skill by ID
export const getSkill = async (req, res) => {
  try {
    const skill = await skillModel.findById(req.params.id);
    if (!skill) {
      return res.status(404).send('Skill not found');
    }
    res.status(200).json({ skill });
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).send(error.message);
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedSkill = await skillModel.findByIdAndUpdate(
      req.params.skillId,
      value,
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).send('Skill not found');
    }

    res.status(200).json({ skill: updatedSkill });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).send(error.message);
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => { // Corrected to deleteSkill
  try {
    const deletedSkill = await skillModel.findByIdAndDelete(req.params.skillId);

    if (!deletedSkill) {
      return res.status(404).send('Skill not found');
    }

    // Remove skill from user
    const user = await userModel.findById(deletedSkill.user); // Use userModel
    if (user) {
      user.skills = user.skills.filter(skillId => skillId.toString() !== req.params.skillId); // Use skills
      await user.save();
    }

    res.status(200).json({ skill: deletedSkill });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).send(error.message);
  }
};
