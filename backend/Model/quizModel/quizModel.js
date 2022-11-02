const mongoose = require("mongoose");

const quiz = mongoose.Schema(
  {
    quiz: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const quizSchema = mongoose.model("quiz", quiz);

module.exports = quizSchema;
