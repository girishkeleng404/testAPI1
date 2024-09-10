// Get all the users
// Get a user by id
const { Sequelize } = require("sequelize");
const user = require("../db/models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


const getAllUser = catchAsync(async(req,res,next)=>{
   const users = await user.findAndCountAll({
    where:{
        userType:{
            [Sequelize.Op.ne]: '0',
        },
       
    },
    attributes: {exclude: ['password']},
   });
   return res.status(200).json({
    status: "success",
    data:users,
   })
})


const getUserById = catchAsync(async(req,res,next)=>{
    const userId = req.params.id;
    const result = await user.findByPk(userId, {where:{userType:{[Sequelize.Op.ne]: '0'}}});
    if(!result){
        return next(new AppError('No user found with this id', 400));

    };
    return res.status(200).json({
        message: "success",
        data:result,
    })
}) 

module.exports ={getAllUser,getUserById};