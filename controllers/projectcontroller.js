import { projectModel } from "../models/projectModel.js";

export const addProject = async(req, res) => {
   
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        console.log('request', req.body)
         const addData = await projectModel.create(req.body);
        res.send(addData);
   
    } catch (error) {
        console.log(error)
    }
    
}

// Get all projects
export const getProjects = async (req,res, next) => {
    try {
       const getData = await projectModel.find() 
       {
        res.status(200).json(getData)
       }
    } catch (error) {
       next(error) 
    }
};

// Get A Single project by ID
export const getProject = async (req,res,next) => {
    try {
        const getSingleData = await projectModel.findById(req.params.id)
        {
            res.status(200).json(getSingleData)
        }
    } catch (error) {
      next(error)  
    }
};

// Update an project
export const updateProject = async (req,res, next) => {
    try {
        const {error, value} = userSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
       const status = req.params.projectStatus;
       console.log(status)
        const updateData = await projectModel.findByIdandUpdate(req.params.id, {projectStatus:status})
        {
            res.status(200).json(updateData)
        }
    } catch (error) {
      next(error)  
    }

}
    

// delete a project

export const deleteProject = async (req,res, next) => {
try {
    const deleteData = await projectModel.findByIdandDelete(req.params.id)
    {
        res.status(200).json(deleteData)
        console.log(`project with the ID:${req.params.id}has been deleted`)
    }
} catch (error) {
 next(error)   
}

}