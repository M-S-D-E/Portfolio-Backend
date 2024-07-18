import { educationModel } from "../models/educationModel.js";
import { userModel } from "../models/user_model.js";
import { educationSchema } from "../Schema/education_Schema.js";


// adding education
export const addEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Create education with the validated data
    const newEducation = await educationModel.create(value);

    // Find user and associate education with the user
    const id = req.session?.user?.id || req?.user?.id; // Assuming user ID is stored in session
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    user.education.push(newEducation._id); // Push the education ID to the user's education array
    await user.save(); // Save the updated user

    res.status(201).json({ education: newEducation });
  } catch (error) {
    console.error('Error adding education:', error);
    res.status(500).send(error.message);
  }
};



// getting all
export const getAllEducation = async (req, res) => {
  try {
      const userId = req.session?.user?.id || req?.user?.id;
      if (!userId) {
          return res.status(401).send('Unauthorized: User ID is missing');
      }

      const allEducation = await educationModel.find({ user: userId });

      if (allEducation.length === 0) {
          return res.status(404).send('No education found for this user');
      }

      res.status(200).json({ education: allEducation });
  } catch (error) {
      console.error('Error fetching education:', error);
      res.status(500).send(error.message);
  }
};

// get by id
export const getEducation = async (req, res) => {
  try {
    const education = await educationModel.findById(req.params.id);

    if (!education) {
      return res.status(404).send('Education not found');
    }

    res.status(200).json({ education });
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).send(error.message);
  }
};


// patching
export const updateEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedEducation = await educationModel.findByIdAndUpdate(
      req.params.educationId,
      value,
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).send('Education not found');
    }

    res.status(200).json({ education: updatedEducation });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).send(error.message);
  }
};



//deleting
export const deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await educationModel.findByIdAndDelete(req.params.educationId);

    if (!deletedEducation) {
      return res.status(404).send('Education not found');
    }

    // Remove education reference from user
    const user = await userModel.findById(deletedEducation.user);
    if (user) {
      user.education = user.education.filter(educationId => educationId.toString() !== req.params.educationId);
      await user.save();
    }

    res.status(200).json({ message: 'Education deleted successfully', education: deletedEducation });
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).send(error.message);
  }
};
