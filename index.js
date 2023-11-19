import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import Register from './Routes/RegisterUserRoute.js'

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true })); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


dotenv.config()
mongoose.connect(
    process.env.MONGO_DB,
    {useNewUrlParser: true, useUnifiedTopology: true}
).
    then(() => app.listen(process.env.PORT, () => console.log('MongoDB connected')))
    .catch((error)=>console.log(error));



app.use('/user', Register)