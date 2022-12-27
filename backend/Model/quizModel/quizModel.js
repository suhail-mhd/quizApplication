const mongoose = require("mongoose");

const quiz = mongoose.Schema(
  {
    quiz: {
      type: String,
      required:true
    },
    category: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const quizSchema = mongoose.model("quiz", quiz);

module.exports = quizSchema;
