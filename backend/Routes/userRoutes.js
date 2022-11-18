const express = require("express");
const router = express.Router();

const {
  getQuestion,
  getCategory,
  storeResult,
  getResult,
  submitAnswer
} = require("../Controllers/userControllers");

router.route("/getQuestion").get(getQuestion);

router.route("/getCategory").get(getCategory);

router.route("/storeResult").post(storeResult);

router.route("/getResult").get(getResult);

router.route("/submitAnswer").post(submitAnswer);

module.exports = router;
