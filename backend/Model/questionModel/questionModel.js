const mongoose = require("mongoose");

const QuestionModel = mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
      },
      options: [{
        type: Array,
        index: true,
        required: true,
      }],
      answer: {
        type: String,
        required: true
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