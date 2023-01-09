const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const cloudinary = require('cloudinary').v2
const generateToken = require("../utils/jwt");
const User = require("../Model/userModel/userModel");
const Question = require("../Model/questionModel/questionModel");
const Category = require("../Model/categoryModel/categoryModel");
const Quiz = require("../Model/quizModel/quizModel");
const Token = require("../Model/tokenModel/tokenModel");

// cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
})

//user register

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const UserExist = await User.findOne({ email });

  if (UserExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
    otp: 24681,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      Token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("error occured");
  }
});

// user login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
        otp: 24681,
      });
    }
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email OR Password Not matching");
  }
});

// get quiz

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

  // get type //

  function quiz(quizzes) {
    const { quiz } = quizzes;
    return quiz;
  }

  const type = submit?.map(quiz);

  // find data by questionId //

  const data = await Question.find({ _id: _id });

  // get total questions //

  const questionsNumber = await Question.find({ type });
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
    type,
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

const quizNav = asyncHandler(async (req, res) => {
  const { quiz } = req.body;
  try {
    const qType = await Category.find({ type: quiz });
    res.json({
      qType,
      quiz,
    });
  } catch (error) {
    console.log(error);
  }
});

const getAllQuestions = asyncHandler(async (req, res) => {
  const type = req.params.type;

  try {
    const allQuestions = await Question.find({ type });
    res.json(allQuestions);
  } catch (error) {
    console.log(
      "Something went wrong when we try to get all Question value",
      error
    );
  }
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  const category = req.params.category;

  try {
    const allQuiz = await Quiz.find({ category });
    res.json(allQuiz);
  } catch (error) {
    console.log(
      "Something went wrong when we try to get all Question value",
      error
    );
  }
});

// profile

const getUserData = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById({ _id: id });

  if (user) {
    res.status(200).json({
      user,
    });
  } else {
    res.status(400).send("error while getting data from database in profile");
  }
});

const userUpdate = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    image: req.body.image
  };

  try {
    const updatedData = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ message: "Data Updated" });
  } catch (error) {
    res.status(400).json({ message: "Data Not Found" });
  }
});

const imageUpload = asyncHandler(async(req, res) => {
try {
  console.log(req.files.image);
  const file = req.files.image
  const result = await cloudinary.uploader.upload(file.tempFilePath)
  console.log("/////",result);
  res.json({
   url: result.secure_url,
   public_id: result.public_id
  })
} catch (error) {
  console.log(error);
}
})

module.exports = {
  registerUser,
  loginUser,
  getQuestion,
  getQuiz,
  getCategory,
  submitAnswer,
  catNav,
  quizNav,
  getAllQuestions,
  getAllQuizzes,
  getUserData,
  userUpdate,
  imageUpload
};
