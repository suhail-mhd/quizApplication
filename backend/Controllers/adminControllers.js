const asyncHandler = require("express-async-handler");
const Question = require("../Model/questionModel/questionModel");
const Quiz = require("../Model/quizModel/quizModel");

const addQuestion = asyncHandler(async (req, res) => {
  const { question, options, answer, category, type } = req.body;

  const data = await Question.create({
    question,
    options,
    answer,
    category,
    type,
  });

  if (data) {
    res.status(200).json({
      id: data._id,
      question: data.question,
      options: data.options,
      answer: data.answer,
      category: data.category,
      type: data.type,
    });
  } else {
    console.log("not good");
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

module.exports = { addQuestion, addQuiz, getQuiz };
