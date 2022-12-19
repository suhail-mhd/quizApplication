const express = require("express");
const router = express.Router();

const {
  getQuiz,
  getQuestion,
  getCategory,
  submitAnswer,
  catNav,
} = require("../Controllers/userControllers");

router.route("/getQuiz").get(getQuiz);

router.route("/getQuestion").get(getQuestion);

router.route("/getCategory").get(getCategory);

router.route("/submitAnswer").post(submitAnswer);

router.route("/catNav").post(catNav);

module.exports = router;
