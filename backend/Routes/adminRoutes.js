const express = require("express");
const adminRouter = express.Router();

const {addQuestion, getQuestion, addQuiz, getQuiz, addCategory, getCategory} = require('../Controllers/adminControllers')

adminRouter.route("/addQuestion").post(addQuestion);

adminRouter.route("/getQuestion").get(getQuestion);

adminRouter.route("/addQuiz").post(addQuiz);

adminRouter.route("/getQuiz").get(getQuiz);

adminRouter.route("/addCategory").post(addCategory);

adminRouter.route("/getCategory").get(getCategory);

module.exports = adminRouter;