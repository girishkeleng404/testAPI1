const user = require('../db/models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;


    if (!['1', '2'].includes(body.userType)) {
        throw new AppError('Invalid user type', 400);

    }
    const newUser = await user.create(
        {
            userType: body.userType,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
        }
    );

    if (!newUser) {
        return next(new AppError('User not created', 400))
    }

    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;
    result.token = generateToken({
        id: result.id
    })




    return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: result
    })


});



const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new AppError("Please enter valid email and password", 400))

    }

    const result = await user.findOne({ where: { email } })
    console.log(result)

    if (!result || (!await bcrypt.compare(password, result.password))) {
        return next(new AppError("Incorrect email or password", 401));

    }




    const token = generateToken({
        id: result.id,
    })

    return res.json({
        status: 'success',
        token,
    })


});



const authentication = catchAsync(async(req, res, next)=>{
    // 1. get token from header
    // 2. token verification
    // 3. check user details from db and add to req object

    let token = "";
    if(req.headers.authorizarion && req.headers.authorizarion.startsWith('Bearer')){
        idToken =
    }

}
)

module.exports = { signup, login }