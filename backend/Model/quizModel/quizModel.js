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

const quizSchema = mongoose.model("quizSchema", quiz);

module.exports = quizSchema;
