const mongoose = require("mongoose");

const category = mongoose.Schema(
  {
    category: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const categorySchema = mongoose.model("category", category);

module.exports = categorySchema;
