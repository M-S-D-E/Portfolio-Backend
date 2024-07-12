import express from 'express'
import { configDotenv } from 'dotenv';
import { dbconnection } from './config/db.js'; 
import session from 'express-session';
import { userRouter } from './routes/userRoute.js';
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

 

// listening to port
const PORT = 6550
app.listen(PORT,() =>{
    console.log(`listening to ${PORT}`)
})