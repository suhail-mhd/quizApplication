const asyncHandler = require("express-async-handler");
const validationResult = require("express-validator");
const Question = require("../Model/questionModel/questionModel");
const Category = require("../Model/categoryModel/categoryModel");
const Quiz = require("../Model/quizModel/quizModel");

const getQuiz = asyncHandler(async (req, res) => {
  try {
    const data = await Quiz.find({});
    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

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

const submitAnswer = asyncHandler(async (req, res) => {
  let { submit } = req.body;

  //  get questionId //

  function selectFewerProps(show) {
    const { _id } = show;
    return _id;
  }

  const _id = submit?.map(selectFewerProps);

  // get user selected option //

  function pick(option) {
    const { check } = option;
    return check;
  }

  const userOption = submit?.map(pick);

  // get category //

  function cat(categories) {
    const { category } = categories;
    return category;
  }

  const category = submit?.map(cat);

  // find data by questionId //

  const data = await Question.find({ _id: _id });

  // get total questions //

  const questionsNumber = await Question.find({category});
  const totalQuestions = questionsNumber.length;

  // total quiz point

  const totalQuizPoints = totalQuestions * 10;

  // get answer from data //

  function selected(sel) {
    const { answer } = sel;
    return answer;
  }

  const check = data.map(selected);

  // check the answer //

  let score = 0;
  for (let i = 0; i < userOption?.length; i++) {
    if (check[i] == userOption[i]) {
      score = score + 10;
    }
  }

  // flag //

  const flag = (totalQuizPoints * 50) / 100 < score;

  res.json({
    totalQuestions,
    totalQuizPoints,
    score,
    flag,
  });
});

const catNav = asyncHandler(async (req, res) => {
  const { category } = req.body;
  try {
    const qCat = await Question.find({ category });
    res.json({
      qCat,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getQuestion,
  getQuiz,
  getCategory,
  submitAnswer,
  catNav,
};
