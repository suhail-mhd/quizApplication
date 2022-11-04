const asyncHandler = require("express-async-handler");
const Question = require("../Model/questionModel/questionModel");
const Category = require("../Model/categoryModel/categoryModel");


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

const checkAnswer = asyncHandler(async (req, res) => {
  const questionId = req.params.id
  
  const data = await Question.findById(questionId)
  console.log(data,".......");

});

module.exports = { getQuestion, checkAnswer, getCategory };
