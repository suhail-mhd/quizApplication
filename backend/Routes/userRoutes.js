const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyUser,
  loginUser,
  passwordLink,
  verifyPassword,
  resetPassword,
  getQuiz,
  getQuestion,
  getCategory,
  submitAnswer,
  catNav,
  quizNav,
  getAllQuizzes,
  getAllQuestions
} = require("../Controllers/userControllers");

router.route("/registerUser").post(registerUser);

router.route("/verifyUser/:id/verify/:token/").get(verifyUser);

router.route("/loginUser").post(loginUser);

router.route("/passwordLink").post(passwordLink);

router.route("/verifyPassword/:id/:token").get(verifyPassword);

router.route("/resetPassword/:id/:token").post(resetPassword);

router.route("/getQuiz").get(getQuiz);

router.route("/getQuestion").get(getQuestion);

router.route("/getCategory").get(getCategory);

router.route("/submitAnswer").post(submitAnswer);

router.route("/catNav").post(catNav);

router.route("/quizNav").post(quizNav);

router.route("/getAllQuizzes/:category").get(getAllQuizzes);

router.route("/getAllQuestions/:type").get(getAllQuestions);

module.exports = router;
