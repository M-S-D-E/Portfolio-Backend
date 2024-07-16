import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import expressOasGenerator from '@mickeymond/express-oas-generator';
import { dbconnection } from './config/db.js'; 
import { restartServer } from './restart_server.js';
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
    tags: [ 'achievement','user', 'userProfile','education','experience','volunteer','skill','project'],
   
    mongooseModels: mongoose.modelNames(),
  
});
//  dbconnection();




// Middleware
app.use(express.json());
app.use(cors({credentials:true, origin:'#'}));
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

  app.get("/api/v1/health", (req, res) => {
    res.json({ status: "UP" });
  });

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

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL)
  }


  
  dbconnection()
  .then(() => {
    const PORT = 6550
    app.listen(PORT, () => {
        reboot().then(() => {
        console.log(`Server Restarted`);
      });
      console.log(`Server is connected to Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });

 

