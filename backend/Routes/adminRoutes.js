const express = require("express");
const adminRouter = express.Router();

const {
  adminLogin,
  addQuestion,
  getQuestion,
  addQuiz,
  getQuiz,
  addCategory,
  getCategory,
  deleteQuestion,
  deleteQuiz,
  deleteCategory,
  updateQuestion,
  updateQuiz,
  updateCategory,
  getAllQuestionDetails,
  getAllQuizDetails,
  getAllCategoryDetails,
  quizNav,
  getAllQuestions
} = require("../Controllers/adminControllers");

adminRouter.route("/adminLogin").post(adminLogin);

adminRouter.route("/addQuestion").post(addQuestion);

adminRouter.route("/getQuestion").get(getQuestion);

adminRouter.route("/addQuiz").post(addQuiz);

adminRouter.route("/getQuiz").get(getQuiz);

adminRouter.route("/addCategory").post(addCategory);

adminRouter.route("/getCategory").get(getCategory);

adminRouter.route("/deleteQuestion").post(deleteQuestion);

adminRouter.route("/deleteQuiz").post(deleteQuiz);

adminRouter.route("/deleteCategory").post(deleteCategory);

adminRouter.route("/getAllQuestionDetails/:id").get(getAllQuestionDetails);

adminRouter.route("/getAllQuizDetails/:id").get(getAllQuizDetails);

adminRouter.route("/getAllCategoryDetails/:id").get(getAllCategoryDetails);

adminRouter.route("/updateQuestion").patch(updateQuestion);

adminRouter.route("/updateQuiz").patch(updateQuiz);

adminRouter.route("/updateCategory").patch(updateCategory);

adminRouter.route("/quizNav").post(quizNav);

adminRouter.route("/getAllQuestions/:type").get(getAllQuestions);

module.exports = adminRouter;
