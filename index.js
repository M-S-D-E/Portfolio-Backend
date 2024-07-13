import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import expressOasGenerator from '@mickeymond/express-oas-generator';
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
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs:true,
    tags: [ 'achiement'],
    tags: [ 'user'],
    tags: [ 'userProfile'],
    tags: [ 'education'],
    tags: [ 'experience'],
    tags: [ 'volunteer'],
    tags: [ 'skills'],
    tags: [ 'project'],
    mongooseModels: mongoose.modelNames(),
  
});
 dbconnection();




// Middleware
app.use(express.json());
app.use(cors());
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

//   using routes
  app.use('/api/v1',userRouter)
  app.use('/api/v1',educationRouter);
  app.use('/api/v1',achievementRouter);
  app.use('/api/v1',experienceRouter);
  app.use('/api/v1',projectRouter);
  app.use('/api/v1',skillRouter);
  app.use('/api/v1',userProfileRouter);
  app.use('/api/v1',volunteerRouter);
 
  expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect('/api-docs/'));


  


 

// listening to port
const PORT = 6550
app.listen(PORT,() =>{
    console.log(`listening to ${PORT}`)
})