const mongoose = require("mongoose");

const QuestionModel = mongoose.Schema(
    {
      question: {
        type: String
        
      },
      option1: {
        type: String,
        index: true
        
      },
      option2: {
        type: String,
        index: true
        
      },
      option3: {
        type: String,
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