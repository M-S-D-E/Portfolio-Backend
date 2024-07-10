import express from 'express'
import { configDotenv } from 'dotenv';
import { dbconnection } from './config/db.js'; 
import { userRouter } from './routes/userRoute.js';




//creating and express app
const app = express();
 dbconnection();




// Middleware
app.use(express.json());

app.use('/api/v1',userRouter)

 

// listening to port
const PORT = 6550
app.listen(PORT,() =>{
    console.log(`listening to ${PORT}`)
})