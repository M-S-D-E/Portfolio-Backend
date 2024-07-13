import express from 'express';
import { configDotenv } from 'dotenv';
import { dbconnection } from './config/db.js'; 
import session from 'express-session';
import { userRouter } from './routes/userRoute.js';
import { educationRouter } from './routes/educationroute.js';
import { achievementRouter } from './routes/achievementroute.js';
import { projectRouter } from './routes/projectroute.js';
import { experienceRouter } from './routes/experienceroute.js';
import { skillRouter } from './routes/skillsroute.js';
import { userProfileRouter } from './routes/userProfileroute.js';
import { volunteerRouter } from './routes/volunteer_route.js';
import MongoStore from 'connect-mongo';




//creating and express app
const app = express();
 dbconnection();




// Middleware
app.use(express.json());
app.use(express.static('uploads'));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    store:MongoStore.create({
        mongoUrl:process.env.Mongo_uri
    })
  }));
  app.use('/api/v1',userRouter)
  app.use('/api/v1',educationRouter);
  app.use('/api/v1',achievementRouter);
  app.use('/api/v1',experienceRouter);
  app.use('/api/v1',projectRouter);
  app.use('/api/v1',skillRouter);
  app.use('/api/v1',userProfileRouter);
  app.use('/api/v1',volunteerRouter);


  


 

// listening to port
const PORT = 6550
app.listen(PORT,() =>{
    console.log(`listening to ${PORT}`)
})