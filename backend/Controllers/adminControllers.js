const asyncHandler = require("express-async-handler");
const Question = require("../Model/questionModel/questionModel");
const Quiz = require("../Model/quizModel/quizModel");

const addQuestion = asyncHandler(async (req, res) => {
  const { question, option1,option2, option3, answer, category, type } = req.body;
  
  const data = await Question.create({
    question,
    option1,
    option2,
    option3,
    answer,
    category,
    type,
  });

  if (data) {
    res.status(200).json({
      id: data._id,
      question: data.question,
      option1: data.option1,
      option2: data.option2,
      option3: data.option3,
      answer: data.answer,
      category: data.category,
      type: data.type,
    });
  } else {
    console.log("not good");
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

const addQuiz = asyncHandler(async (req, res) => {
  const { quiz } = req.body;
  const data = await Quiz.create({ quiz });

  if (data) {
    res.status(200).json({ status: true, quiz: data.quiz });
  } else {
    res.status(400).send("error while quiz value inserting to database");
  }
});

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

module.exports = { addQuestion, getQuestion, addQuiz, getQuiz };
