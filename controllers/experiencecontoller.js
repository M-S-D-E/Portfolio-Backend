import { experienceModel } from "../models/experienceModel.js";

export const addExperience = async(req, res) => {
   
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        console.log('request', req.body)
         const addData = await experienceModel.create(req.body);
        res.send(addData);
   
    } catch (error) {
        console.log(error)
    }
    
}

// Get all experiences
export const getExperiences = async (req,res, next) => {
    try {
       const getData = await experienceModel.find() 
       {
        res.status(200).json(getData)
       }
    } catch (error) {
       next(error) 
    }
};

// Get A Single experience by ID
export const getExperience = async (req,res,next) => {
    try {
        const getSingleData = await experienceModel.findById(req.params.id)
        {
            res.status(200).json(getSingleData)
        }
    } catch (error) {
      next(error)  
    }
};

// Update an experience
export const updateExperience = async (req,res, next) => {
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
       const status = req.params.experienceStatus;
       console.log(status)
        const updateData = await experienceModel.findByIdandUpdate(req.params.id, {experienceStatus:status})
        {
            res.status(200).json(updateData)
        }
    } catch (error) {
      next(error)  
    }

}
    

// delete an experience

export const deleteExperience = async (req,res, next) => {
try {
    const deleteData = await experienceModel.findByIdandDelete(req.params.id)
    {
        res.status(200).json(deleteData)
        console.log(`experience with the ID:${req.params.id}has been deleted`)
        
    }
} catch (error) {
 next(error)   
}

}