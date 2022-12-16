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
  deleteQuiz,
  updateQuestion,
  updateQuiz,
  getAllQuestionDetails,
  getAllQuizDetails
} = require("../Controllers/adminControllers");

adminRouter.route("/addQuestion").post(addQuestion);

adminRouter.route("/getQuestion").get(getQuestion);

adminRouter.route("/addQuiz").post(addQuiz);

adminRouter.route("/getQuiz").get(getQuiz);

adminRouter.route("/addCategory").post(addCategory);

adminRouter.route("/getCategory").get(getCategory);

adminRouter.route("/deleteQuestion").post(deleteQuestion);

adminRouter.route("/deleteQuiz").post(deleteQuiz);

adminRouter.route("/getAllQuestionDetails/:id").get(getAllQuestionDetails);

adminRouter.route("/getAllQuizDetails/:id").get(getAllQuizDetails);

adminRouter.route("/updateQuestion").patch(updateQuestion);

adminRouter.route("/updateQuiz").patch(updateQuiz);

module.exports = adminRouter;
