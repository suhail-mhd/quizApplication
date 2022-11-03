const mongoose = require("mongoose");

const category = mongoose.Schema(
  {
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const categorySchema = mongoose.model("category", category);

module.exports = categorySchema;
