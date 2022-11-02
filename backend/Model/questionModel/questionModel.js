const mongoose = require("mongoose");

const QuestionModel = mongoose.Schema(
    {
      question: {
        type: String
        
      },
      options: {
        type: Array,
        index: true
        
      },
      answer: {
        type: String
      },
      category: {
        type: String
        
      },
      type: {
        type: String
        
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Question = mongoose.model("Question", QuestionModel);
  
  module.exports = Question;