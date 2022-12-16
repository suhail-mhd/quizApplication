const asyncHandler = require("express-async-handler");
const Question = require("../Model/questionModel/questionModel");
const Quiz = require("../Model/quizModel/quizModel");
const Category = require("../Model/categoryModel/categoryModel");

// questionHandles

const addQuestion = asyncHandler(async (req, res) => {
  const {
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    category,
    type,
  } = req.body;

  const questionExist = await Question.findOne({ question });

  if (questionExist) {
    res.status(400);
    throw new Error("Question Already Exist");
  }

  const data = await Question.create({
    question,
    option1,
    option2,
    option3,
    option4,
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
      option4: data.option4,
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

// quizHandles

const addQuiz = asyncHandler(async (req, res) => {
  const { quiz } = req.body;

  const quizExist = await Quiz.findOne({ quiz });

  if (quizExist) {
    res.status(400);
    throw new Error("Quiz Already Exist");
  }

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

// categoryHandles

const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  const categoryExist = await Category.findOne({ category });

  if (categoryExist) {
    res.status(400);
    throw new Error("category Already Exist");
  }

  const data = await Category.create({ category });

  if (data) {
    res.status(200).json({ status: true, category: data.category });
  } else {
    res.status(400).send("error while category value inserting to database");
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

// delete question

const deleteQuestion = asyncHandler(async (req, res) => {
  const { deleteId } = req.body;
  const dltQuestion = await Question.findById(deleteId);
  await dltQuestion.delete();
  res.json({});
});

// update question

const getAllQuestionDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const allQuestion = await Question.findById(id);
    res.json(allQuestion);
  } catch (error) {
    console.log(
      "Something went wrong when we try to get all Question value",
      error
    );
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // console.log(id);

  const newQuestionData = {
    questions: req.body.questions,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer,
    category: req.body.category,
    type: req.body.type,
  };

  const questionData = await Question.findByIdAndUpdate(id, newQuestionData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json(questionData);
});

module.exports = {
  addQuestion,
  getQuestion,
  addQuiz,
  getQuiz,
  addCategory,
  getCategory,
  deleteQuestion,
  getAllQuestionDetails,
  updateQuestion,
};
