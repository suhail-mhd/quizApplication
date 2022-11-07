const mongoose = require("mongoose");

const QuestionModel = mongoose.Schema(
    {
      question: {
        type: String,
        require: true
      },
      option1: {
        type: String,
        index: true,
        require: true
        
      },
      option2: {
        type: String,
        index: true,
        require: true
        
      },
      option3: {
        type: String,
        index: true,
        require: true
        
      },
      option4: {
        type: String,
        index: true,
        require: true
        
      },
      answer: {
        type: String,
        enum: ["A", "B", "C", "D"],
        require: true
      },
      category: {
        type: String,
        require: true
      },
      type: {
        type: String,
        require: true
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Question = mongoose.model("Question", QuestionModel);
  
  module.exports = Question;