const express = require("express");
const adminRouter = express.Router();

const {addQuestion, addQuiz, getQuiz} = require('../Controllers/adminControllers')

adminRouter.route("/addQuestion").post(addQuestion);
adminRouter.route("/addQuiz").post(addQuiz);
adminRouter.route("/getQuiz").get(getQuiz);

module.exports = adminRouter;