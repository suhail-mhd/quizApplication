const express = require("express");
const router = express.Router();

const {getQuestion, checkAnswer, getCategory } = require('../Controllers/userControllers')

router.route("/getQuestion").get(getQuestion)

router.route("/getCategory").get(getCategory)

router.route("/checkAnswer/:id").post(checkAnswer)

module.exports = router