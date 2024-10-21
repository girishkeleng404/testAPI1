const { where } = require("sequelize");
const sequelize = require("../config/database");
const { more_data, project, user, dynamicTable1 } = require("../db/models");
const db = require("../db/models");
// const user = require("../db/models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// const dynamictable1 = require("../db/models/dynamictable1");

const createProject = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;
    const t = await sequelize.transaction();

    try {
        const newProject = await project.create(
            { ...body.project, createdBy: userId },
            { transaction: t }
        );
        console.log(newProject);

        //    const newMoreData = await more_data.create({ ...body.more_data, product_id: newProject.id }, { transaction: t })

        if (body.associations && typeof body.associations === "object") {
            console.log("Associations found:", body.associations); // Log associations

            for (const [tableName, records] of Object.entries(body.associations)) {
                console.log("Processing table:", tableName);

                if (Array.isArray(records)) {
                    console.log("Records found for table:", tableName, records); // Log records



                    for (const record of records) {
                        const Model = db[tableName];
                        console.log("Loaded model:", Model);

                        if (Model && typeof Model.create === 'function') {
                            await Model.create({ ...record, product_id: newProject.id }, { transaction: t });
                        } else {
                            console.error(`Model ${tableName} does not have a create function or could not be found.`);
                        }
                    }
                }
            }
        }

        await t.commit();
        return res.status(201).json({
            status: "success",
            data: {
                data: { project: newProject, associations: body.associations },
            },
        });
    } catch (err) {
        (await t).rollback();
        return next(new AppError(err.message, 400));
    }
});

const includeAssociate = [
    {
        model: more_data,
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    },
    {
    model: dynamicTable1,
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    },
    {
        model: user,
        attributes: {
            exclude: ["id", "password", "createdAt", "updatedAt", "deletedAt"],
        },
    },
].filter(Boolean); // Filter out falsey values (like undefined)

const getAllProject = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await project.findAll({
        include: includeAssociate,
        where: { createdBy: userId },
    });

    return res.json({
        status: "success",
        data: result,
    });
});

const getProjectById = catchAsync(async (req, res, next) => {
    const projectId = req.params.id;
    const result = await project.findByPk(projectId, {
        include: includeAssociate,
    });

    if (!result) {
        return next(new AppError("No project found with this id", 400));
    }

    return res.json({
        status: "success",
        data: result,
    });
});

const upDateProject = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await project.findOne({
        where: { id: projectId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError("No project found with this id", 400));
    }

    result.title = body.project.title;
    result.productImage = body.project.productImage;
    result.price = body.project.price;
    result.shortDescription = body.project.shortDescription;
    result.description = body.project.description;
    result.productUrl = body.project.productUrl;
    result.category = body.project.category;
    result.tags = body.project.tags;

    const updatedResult = await result.save();

    if (body.more_data) {
        for (const moreDataItem of body.more_data) {
            if (moreDataItem.id) {
                const moreData = await more_data.findOne({
                    where: { id: moreDataItem.id, product_id: updatedResult.id },
                });

                if (moreData) {
                    moreData.moreData_1 = moreDataItem.moreData_1;
                    moreData.moreData_2 = moreDataItem.moreData_2;
                    await moreData.save();
                } else {
                    return next(
                        new AppError(
                            `No associated more_data found with id: ${moreDataItem.id}`,
                            400
                        )
                    );
                }
            } else {
                await more_data.create({
                    ...moreDataItem,
                    product_id: updatedResult.id,
                });
            }
        }
    }

    const updatedProjectWithMoreData = await project.findByPk(updatedResult.id, {
        include: includeAssociate,
    });

    return res.json({
        status: "success",
        data: updatedProjectWithMoreData,
    });
});
const deleteProject = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const projectId = req.params.id;
    const body = req.body;

    const result = await project.findOne({
        where: { id: projectId, createdBy: userId },
    });

    if (!result) {
        return next(new AppError("No project found with this id", 400));
    }

    await result.destroy();
    return res.json({
        status: "success",
        message: "Project deleted successfully",
    });
});

module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    upDateProject,
    deleteProject,
};
