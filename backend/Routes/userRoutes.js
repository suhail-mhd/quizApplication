const express = require("express");
const router = express.Router();
const expressFormidable = require("express-formidable");

const {
  registerUser,
  loginUser,
  getQuiz,
  getQuestion,
  getCategory,
  submitAnswer,
  catNav,
  quizNav,
  getAllQuizzes,
  getAllQuestions,
  getUserData,
  userUpdate,
  imageUpload,
} = require("../Controllers/userControllers");

router.route("/registerUser").post(registerUser);

router.route("/loginUser").post(loginUser);

router.route("/getQuiz").get(getQuiz);

router.route("/getQuestion").get(getQuestion);

router.route("/getCategory").get(getCategory);

router.route("/submitAnswer").post(submitAnswer);

router.route("/catNav").post(catNav);

router.route("/quizNav").post(quizNav);

router.route("/getAllQuizzes/:category").get(getAllQuizzes);

router.route("/getAllQuestions/:type").get(getAllQuestions);

router.route("/getUserData/:id").get(getUserData);

router.route("/userUpdate/:id").patch(userUpdate);

router
  .route("/imageUpload", expressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }))
  .post(imageUpload);

module.exports = router;
