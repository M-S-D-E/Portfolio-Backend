import { userProfile} from "../models/userProfile-model.js";
import { user } from "../models/user_model.js";
import { userProfileSchema} from "../Schema/userProfile_schema.js";

export const userProfile = async(req, res) => {
   
    try {
        const {error, value} = userProfileSchema.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        // create userProfile with the value
         const userProfile = await userProfile.create(value);

        //  after,find the user with the id that you passed when creating the userProfile
        const User = await user.findById(value.user);
        if(!user){
            return res.status(404).send('user not found');
        }

        // if you find the user,push the userProfile id you just created inside
        user.userProfile.push(userProfile._id);

        // and save the user now with the userProfile
        await user.save();

        // return the userProfile
        res.status(201).json({userProfile});
   
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

// Get all userProfile
export const allUserProfile = async (req,res) => {
    try {
        // we are fetching userProfile that belongs to a particular user
        const userId = req.params.id
       const allUserProfile = await userProfile.find() 
      if(allUserProfile.length == 0) {
        return res.status(404).send('No userProfile added')
      }
        
       res.status(200).json({userProfile:allUserProfile})
    } catch (error) {
        
    }
};

// Get A Single userProfile by ID
export const getUserProfile = async (req,res) => {
   
    const userProfile = await userProfile.findById(req.params.id)
        
            res.status(200).json(userProfile)
};


// Update a userprofile
export const updateUserProfile = async (req,res, next) => {
    try {
        const {error, value} = userProfile.validate(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
       
       console.log('value', value)
        const skill = await userProfile.findByIdandUpdate(req.params.id, req.body)
        {
            res.status(200).json(userProfile)
        }
    } catch (error) {
      next(error)  
    }

}
    

// delete a userprofile

export const deleteUserProfile = async (req,res, next) => {
try {
    const deleteData = await userProfileSchema.findByIdandDelete(req.params.id)
    {
        res.status(200).json(deleteData)
        console.log(`userProfile with the ID:${req.params.id}has been deleted`)
    }
} catch (error) {
 next(error)   
}

}