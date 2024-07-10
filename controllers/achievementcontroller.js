import { achievementModel } from "../models/acheivementModel.js";

export const addAchievement = async(req, res,next) => {
   
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        console.log('request', req.body)
         const addData = await achievementModel.create({
            ...req.body,
            Banner:req.file.filename
         });
         res.status(201).json(addData);
   
    } catch (error) {
        next(error)
    }
    
};

// Get all achievements
export const getAchievements = async (req,res, next) => {
    try {
       const getData = await achievementModel.find() 
       {
        res.status(200).json(getData)
       }
    } catch (error) {
       next(error) 
    }
};


// Get A Single achievement by ID
export const getAchievement = async (req,res,next) => {
    try {
        const getSingleData = await achievementModel.findById(req.params.id)
        {
            res.status(200).json(getSingleData)
        }
    } catch (error) {
      next(error)  
    }
};

// Update an achievement
export const updateAchievement = async (req,res, next) => {
    try {
        const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
       const status = req.params.achievementStatus;
       console.log(status)
        const updateData = await achievementModel.findByIdandUpdate(req.params.id, {achievementStatus:status})
        {
            res.status(200).json(updateData)
        }
    } catch (error) {
      next(error)  
    }

}
    

// delete an achievement

export const deleteAchievement = async (req,res, next) => {
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