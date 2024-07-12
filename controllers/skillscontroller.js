import { skill, skillModel } from "../models/skillsModel.js";
import { user } from "../models/user_model.js";
import { skill } from "../Schema/skills_schema.js";

export const addSkill = async (req, res) => {

    try {
        const { error, value } = skill.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // create skill with the value
        const skill = await skillModel.create(value);

        //  after,find the user with the id that you passed when creating the skill
        const User = await user.findById(value.user);
        if (!user) {
            return res.status(404).send('user not found');
        }

        // if you find the user,push the skill id you just created inside
        user.skill.push(skill._id);

        // and save the user now with the skill
        await user.save();

        // return the skill
        res.status(201).json({ skill });

    } catch (error) {
        return res.status(500).send(error)
    }

}

// Get all skills
export const allSkill = async (req, res) => {
    try {
        // we are fetching skill that belongs to a particular user
        const userId = req.params.id
        const allSkill = await skillModel.find()
        if (allSkill.length == 0) {
            return res.status(404).send('No Skill added')
        }

        res.status(200).json({ skill: allSkill })
    } catch (error) {

    }
};

// Get A Single skill by ID
export const getSkill = async (req, res) => {

    const skill = await skillModel.findById(req.params.id)

    res.status(200).json(skill)
};


// Update an skil
export const updateSkill = async (req, res, next) => {
    try {
        const { error, value } = skill.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        console.log('value', value)
        const skill = await skillModel.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(skill)
        }
    } catch (error) {
        next(error)
    }

}


// delete an skill

export const deleteSkill = async (req, res, next) => {
    try {
        const deleteData = await skillModel.findByIdandDelete(req.params.id)
        {
            res.status(200).json(deleteData)
            console.log(`skill with the ID:${req.params.id}has been deleted`)
        }
    } catch (error) {
        next(error)
    }

}