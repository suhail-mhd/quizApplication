const express = require("express");
const adminRouter = express.Router();

const {addQuestion, getQuestion, addQuiz, getQuiz} = require('../Controllers/adminControllers')

adminRouter.route("/addQuestion").post(addQuestion);
adminRouter.route("/getQuestion").get(getQuestion);
adminRouter.route("/addQuiz").post(addQuiz);
adminRouter.route("/getQuiz").get(getQuiz);

module.exports = adminRouter;