const express = require("express");
const adminRouter = express.Router();

const {
  addQuestion,
  getQuestion,
  addQuiz,
  getQuiz,
  addCategory,
  getCategory,
  deleteQuestion,
  updateQuestion,
  getAllQuestionDetails,
} = require("../Controllers/adminControllers");

adminRouter.route("/addQuestion").post(addQuestion);

adminRouter.route("/getQuestion").get(getQuestion);

adminRouter.route("/addQuiz").post(addQuiz);

adminRouter.route("/getQuiz").get(getQuiz);

adminRouter.route("/addCategory").post(addCategory);

adminRouter.route("/getCategory").get(getCategory);

adminRouter.route("/deleteQuestion").post(deleteQuestion);

adminRouter.route("/getAllQuestionDetails/:id").get(getAllQuestionDetails);

adminRouter.route("/updateQuestion").patch(updateQuestion);

module.exports = adminRouter;
