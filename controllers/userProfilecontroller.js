import { userProfileModel } from "../models/userProfile-model.js"; // Use userProfileModel to avoid conflicts
import { userModel } from "../models/user_model.js"; // Use userModel to avoid conflicts
import { userProfileSchema } from "../Schema/userProfile_schema.js";

// Create or update user profile
export const addOrUpdateUserProfile = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find the user with the ID that you passed when creating/updating the user profile
    const userId = value.user; // Assuming the schema includes a user field
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Create or update the user profile
    let userProfile = await userProfileModel.findOneAndUpdate(
      { user: userId }, // Find by user ID
      value,
      { new: true, upsert: true } // Create if not exists, return the new document
    );

    // Associate the user profile with the user
    user.userProfile = userProfile._id;
    await user.save();

    // Return the user profile
    res.status(201).json({ userProfile });

  } catch (error) {
    console.error('Error adding/updating user profile:', error);
    res.status(500).send(error.message);
  }
};

// Get all user profiles
export const allUserProfiles = async (req, res) => {
  try {
    const allUserProfiles = await userProfileModel.find();
    if (allUserProfiles.length === 0) {
      return res.status(404).send('No user profiles found');
    }
    res.status(200).json({ userProfiles: allUserProfiles });
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    res.status(500).send(error.message);
  }
};

// Get a single user profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await userProfileModel.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).send('User profile not found');
    }
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send(error.message);
  }
};

// Update a user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedUserProfile = await userProfileModel.findByIdAndUpdate(
      req.params.userProfileId,
      value,
      { new: true }
    );

    if (!updatedUserProfile) {
      return res.status(404).send('User profile not found');
    }

    res.status(200).json({ userProfile: updatedUserProfile });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send(error.message);
  }
};

// Delete a user profile
export const deleteUserProfile = async (req, res) => {
  try {
    const deletedUserProfile = await userProfileModel.findByIdAndDelete(req.params.userProfileId);

    if (!deletedUserProfile) {
      return res.status(404).send('User profile not found');
    }

    // Remove user profile reference from user
    const user = await userModel.findById(deletedUserProfile.user);
    if (user) {
      user.userProfile = null;
      await user.save();
    }

    res.status(200).json({ userProfile: deletedUserProfile });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).send(error.message);
  }
};
