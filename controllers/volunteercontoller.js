import { volunteeringModel } from "../models/volunteeringModel.js";

export const addVolunteer = async(req, res) => {
   
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        console.log('request', req.body)
         const addData = await volunteeringModel.create(req.body);
        res.send(addData);
   
    } catch (error) {
        console.log(error)
    }
    
}

// Get all volunteer
export const getVolunteers = async (req,res, next) => {
    try {
       const getData = await volunteeringModel.find() 
       {
        res.status(200).json(getData)
       }
    } catch (error) {
       next(error) 
    }
};

// Get A Single volunteer by ID
export const getVolunteer = async (req,res,next) => {
    try {
        const getSingleData = await volunteeringModel.findById(req.params.id)
        {
            res.status(200).json(getSingleData)
        }
    } catch (error) {
      next(error)  
    }
};

// Update an volunteer
export const updateVolunteer = async (req,res, next) => {
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
       const status = req.params.educationStatus;
       console.log(status)
        const updateData = await volunteeringModel.findByIdandUpdate(req.params.id, {educationStatus:status})
        {
            res.status(200).json(updateData)
        }
    } catch (error) {
      next(error)  
    }

}
    

// delete an volunteer

export const deleteVolunteer = async (req,res, next) => {
try {
    const deleteData = await volunteeringModel.findByIdandDelete(req.params.id)
    {
        res.status(200).json(deleteData)
        console.log(`volunteer with the ID:${req.params.id}has been deleted`)
    }
} catch (error) {
 next(error)   
}

}