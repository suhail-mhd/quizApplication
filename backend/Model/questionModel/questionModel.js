const mongoose = require("mongoose");

const QuestionModel = mongoose.Schema(
    {
      question: {
        type: String,
        required: true
      },
      option1: {
        type: String,
        index: true,
        required: true
        
      },
      option2: {
        type: String,
        index: true,
        required: true
        
      },
      option3: {
        type: String,
        index: true,
        required: true
        
      },
      option4: {
        type: String,
        index: true,
        required: true
        
      },
      answer: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Question = mongoose.model("Question", QuestionModel);
  
  module.exports = Question;