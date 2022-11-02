const asyncHandler = require("express-async-handler");
const Question = require("../Model/questionModel/questionModel");

const getQuestion = asyncHandler(async (req, res) => {
    try {
      const data = await Question.find({});
      res.json({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  });


  module.exports = {getQuestion}