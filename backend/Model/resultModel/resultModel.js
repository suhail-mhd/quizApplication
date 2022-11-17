const mongoose = require("mongoose");

const result = mongoose.Schema(
  {
    result: {
      type: Array,
      default:[]
    },
    attempts: {
      type: Number,
      default: 0
    },
    points: {
      type: Number,
      default: 0
    },
    achieved: {
      type: String,
      default:''
    },
  },
  {
    timestamps: true,
  }
);

const resultSchema = mongoose.model("result", result);

module.exports = resultSchema;
