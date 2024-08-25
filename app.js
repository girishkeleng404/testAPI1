
import express from 'express';
import authRoute from './routes/authRoute.js';
import dotenv from 'dotenv'

const app =express();
dotenv.config();
const PORT = process.env.APP_PORT || 4000;

app.get('/', (req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the API'
    })
})

app.use('/api/v1/auth', authRoute)



app.use('*',(req,res, next)=>{
    res.status(404).json({
        status: 'error',
        message: 'Resource not found'
    })
})

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT)
} )