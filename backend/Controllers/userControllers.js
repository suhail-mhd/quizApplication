const asyncHandler = require("express-async-handler");
const validationResult = require("express-validator");
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

const submitAnswer = asyncHandler(async (req, res) => {
  let { questions } = req.body;

  //  get questionId //

  function selectFewerProps(show) {
    const { _id } = show;
    return _id;
  }

  const _id = questions.map(selectFewerProps);

  // get user selected option //

  function pick(option) {
    const { check } = option;
    return check;
  }

  const userOption = questions.map(pick);

  // find data by questionId //

  const data = await Question.find({ _id: _id });

  // get answer from data //

  function selected(sel) {
    const { answer } = sel;
    return answer;
  }

  const check = data.map(selected);

  // check the answer //

  let score = 0;
  for (let i = 0; i < userOption.length; i++) {
    if (check[i] == userOption[i]) {
      score = score + 10;
    }
  }
  res.json({
    score,
  });
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

module.exports = {
  getQuestion,
  getCategory,
  storeResult,
  getResult,
  submitAnswer,
};
