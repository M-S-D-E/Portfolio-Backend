import { educationModel } from "../models/educationModel.js";

export const addEducation = async(req, res) => {
   
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
         console.log('request', req.body)
        const addData = await educationModel.create(req.body);
       res.send(addData);
  
   } catch (error) {
       console.log(error)
   }
    }


      
    // Get all education
export const getEducations = async (req,res, next) => {
    try {
       const getData = await educationModel.find() 
       {
        res.status(200).json(getData)
       }
    } catch (error) {
       next(error) 
    }
};

// Get A Single experience by ID
export const getEducation = async (req,res,next) => {
    try {
        const getSingleData = await educationModel.findById(req.params.id)
        {
            res.status(200).json(getSingleData)
        }
    } catch (error) {
      next(error)  
    }
};

// Update an experience
export const updateEducation = async (req,res, next) => {
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
       const status = req.params.educationStatus;
       console.log(status)
        const updateData = await educationModel.findByIdandUpdate(req.params.id, {educationStatus:status})
        {
            res.status(200).json(updateData)
        }
    } catch (error) {
      next(error)  
    }

}
    

// delete an education

export const deleteEducation = async (req,res, next) => {
try {
    const deleteData = await educationModel.findByIdandDelete(req.params.id)
    {
        res.status(200).json(deleteData)
        console.log(`education with the ID:${req.params.id}has been deleted`)
    }
} catch (error) {
 next(error)   
}

}