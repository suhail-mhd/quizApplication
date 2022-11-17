const asyncHandler = require("express-async-handler");
const Question = require("../Model/questionModel/questionModel");
const Category = require("../Model/categoryModel/categoryModel");
const Result = require("../Model/resultModel/resultModel");

const getQuestion = asyncHandler(async (req, res) => {
  try {
    const data = await Question.find({});
    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const data = await Category.find({});
    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

const storeResult = asyncHandler(async (req, res) => {
  try {
    const { result, attempts, points, achieved } = req.body;
    if (!result) throw new Error("Result No Provided");

    const data = await Result.create({ result, attempts, points, achieved });

    if (data) {
      res.status(200).json({
        id: data._id,
        result: data.result,
        attempts: data.attempts,
        points: data.points,
        achieved: data.achieved,
      });
    } else {
      console.log("not good");
    }
  } catch (error) {
    console.log(error);
  }
});

const getResult = asyncHandler(async (req, res) => {
  try {
    const data = await Result.find({});
    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { getQuestion, getCategory, storeResult, getResult };
