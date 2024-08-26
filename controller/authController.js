const user = require('../db/models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")


const generateToken =(payload)=>{
   return  jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_IN,
      })
}

const signup = async (req,res,next)=>{
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
    
    if(!newUser){
        return res.status(400).json({
            status: 'error',
            message: 'User not created'
        });
    }

    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;
    result.token = generateToken({
        id:result.id
    })

    
   

    return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: result
    })


};



const login =async (req,res,next)=>{
    const {email,password} = req.body;


    if(!email || !password){
      return res.status(400).json({
            status:"fail",
            message: "Please enter valid email and password"
        })
    }

    const result = await user.findOne({where:{email}})
    if(!result || !(await bcrypt.compare(password,result.password))){
       return res.status(401).json({
            status:"fail",
            message: "Incorrect email or password"
        })
    }

    const token = generateToken({
        id:result.id,
    })

    return res.json({
        status: 'success',
        token,
    })

  
}


module.exports ={signup,login}