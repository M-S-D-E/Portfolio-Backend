import { user } from "../models/user_model.js";
import { userSchema } from "../Schema/user_schema.js";
import bcrypt from 'bcrypt'



// creating a Post method
export const signup = async (req, res,) => {
    const { error, value } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const email = value.email
    console.log('email', email)

    const findIfUserExit = await user.findOne({ email })

    // checkiing if a user exit
    if (findIfUserExit) {
        return res.status(401).send('User has already signed up')
    } else {
        const hashedPassword = await bcrypt.hash(value.password,12)
        value.password = hashedPassword
      }
        const addUser = await user.create(value)
        return res.status(201).send(addUser)
    }


    export const getUser = async (req, res) => {
        try {
          const userId = req.params.id;
      
          // Get user based on the user id, excluding password and populating education
          const userDetails = await user.findById(userId)
            .select('-password')
            .populate('education');
      
          if (!userDetails) {
            return res.status(404).send('User not found');
          }
      
          return res.status(200).json({ user: userDetails });
        } catch (error) {
          return res.status(500).send(error.message);
        }
      };
      
