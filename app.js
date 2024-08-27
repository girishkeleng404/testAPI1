const express = require('express');
const authRoute = require('./routes/authRoute.js');
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync.js');
const AppError = require('./utils/appError.js');
const { stack } = require('sequelize/lib/utils');
const globleErrorHandler = require('./controller/errorController.js');

const app = express();
dotenv.config();
const PORT = process.env.APP_PORT || 4000;



app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the API'
    });
});

app.use('/api/v1/auth', authRoute);

app.use('*', catchAsync(async (req, res, next) => {
    // return next( new Error('Resource not found'))
    throw new AppError('Resource not found', 404);


}));


app.use( globleErrorHandler);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
