import { userModel } from "../models/user_model.js";
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

    const findIfUserExit = await userModel.findOne({ email })

    // checking if a user exit
    if (findIfUserExit) {
        return res.status(401).send('User has already signed up')
    } else {
        const hashedPassword = await bcrypt.hash(value.password,12)
        value.password = hashedPassword
      }
        const addUser = await userModel.create(value)
        return res.status(201).send(addUser)
    }


    export const getUser = async (req, res) => {
        try {
          const userId = req.session.user.id;
      
          // Get user based on the user id, excluding password and populating education
          const userDetails = await userModel.findById(userId)
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
      


      export const login = async (req, res, next) => {
        try {
          const { email, username, password } = req.body;
      
          const user = await userModel.findOne({
            $or: [
              { email: email },
              { username: username },
            ]
          });
      
          if (!user) {
            return res.status(401).json('No user found');
          } else {
            const correctPassword = bcrypt.compareSync(password, user.password);
            if (!correctPassword) {
              return res.status(401).json('Invalid credentials');
            }
            // Generate user sesssion
            req.session.user = { id: user.id }
            // Here you can generate and return a token if using JWT, or handle successful login in other ways
            res.status(200).json({ message: 'Login successful' });
          }
        } catch (error) {
          next(error);
        }
      };
