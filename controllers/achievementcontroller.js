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
export const updateAchievement = async (req, res, next) => {
    try {
        const { error, value } = achievement.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        const achievement = await achievementModel.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(achievement)
        }
    } catch (error) {
        next(error)
    }

}


// delete an achievement

export const deleteAchievement = async (req, res, next) => {
    try {
        const deleteData = await achievementModel.findByIdandDelete(req.params.id)
        {
            res.status(200).json(deleteData)
            console.log((`achievement with the ID:${req.params.id}has been deleted`))
        }
    } catch (error) {
        next(error)
    }

};