const user = require('../db/models/user');
const jwt = require('jsonwebtoken')
const generateToken =(payload)=>{
   return  jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN,
      })
}

exports.signup = async (req,res,next)=>{
    const body = req.body;


    if(!['1','2'].includes(body.userType)){
        return res.status(400).json({
            status: 'error',
            message: 'Invalid user type'
        });
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


    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;
    result.token = generateToken({
        id:result.id
    })

    
    if(!newUser){
        return res.status(400).json({
            status: 'error',
            message: 'User not created'
        });
    }

    return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: result
    })


}



// module.exports=signup;
// 38.00