const sequelize = require("../config/database");
const {more_data,project, user} = require("../db/models");
// const project = require("../db/models");
// const user = require("../db/models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync")

const createProject = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;
    const t = await sequelize.transaction();
    // const newProject = await project.create({
    //     title: body.title,
    //     // isFeatured: body.isFeatured,
    //     productImage: body.productImage,
    //     price: body.price,
    //     shortDescription: body.shortDescription,
    //     description: body.description,
    //     productUrl: body.productUrl,
    //     category: body.category,
    //     tags: body.tags,
    //     createdBy: userId,
    // });

    // return res.status(201).json({
    //     status: "success",
    //     data: newProject
    // });

   
try{
    // console.log(userId + " and " + JSON.stringify(body));

    const newProject = await project.create({...body.project, createdBy:userId},{transaction: t})
    console.log(newProject);
    const newMoreData = await more_data.create({...body.more_data, product_id: newProject.id}, {transaction:t})
    
    await t.commit();
    return res.status(201).json({
      status: "success",
      data: {newProject,
        newMoreData
      }
    });


}catch(err){
    (await t).rollback();
    return next(new AppError(err.message, 400));
}


});


const getAllProject = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await project.findAll({ include: user, where:{createdBy:userId} });

    return res.json({
        status: "success",
        data: result,
    })
});


const getProjectById = catchAsync(async (req, res, next) => {
    const projectId = req.params.id;
    const result = await project.findByPk(projectId, { include: user });

    if (!result) {
        return next(new AppError('No project found with this id', 400));
    }

    return res.json({
        status: "success",
        data: result,
    })
});


const upDateProject = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await project.findOne({ where: { id: projectId, createdBy: userId } });

    if (!result) {
        return next(new AppError('No project found with this id', 400));
    }

    result.title = body.title;
    result.productImage = body.productImage;
    result.price = body.price;
    result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.productUrl = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;

    const updatedResult = await result.save();
    return res.json({
        status: "success",
        data: updatedResult,
    })

})
const deleteProject = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await project.findOne({ where: { id: projectId, createdBy: userId } });

    if (!result) {
        return next(new AppError('No project found with this id', 400));
    }


    await result.destroy();
    return res.json({
        status: "success",
        message: "Project deleted successfully",
    })

})

module.exports = { createProject, getAllProject, getProjectById, upDateProject, deleteProject };