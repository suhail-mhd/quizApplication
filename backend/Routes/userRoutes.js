const express = require("express");
const router = express.Router();

const {
  getQuestion,
  getCategory,
  submitAnswer,
  catNav,
} = require("../Controllers/userControllers");

router.route("/getQuestion").get(getQuestion);

router.route("/getCategory").get(getCategory);

router.route("/submitAnswer").post(submitAnswer);

router.route("/catNav").post(catNav);

module.exports = router;
