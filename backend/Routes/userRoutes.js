const express = require("express");
const router = express.Router();

const {
  getQuiz,
  getQuestion,
  getCategory,
  submitAnswer,
  catNav,
  quizNav,
  getAllCategories,
  getAllQuestions
} = require("../Controllers/userControllers");

router.route("/getQuiz").get(getQuiz);

router.route("/getQuestion").get(getQuestion);

router.route("/getCategory").get(getCategory);

router.route("/submitAnswer").post(submitAnswer);

router.route("/catNav").post(catNav);

router.route("/quizNav").post(quizNav);

router.route("/getAllCategories/:type").get(getAllCategories);

router.route("/getAllQuestions/:category").get(getAllQuestions);

module.exports = router;
