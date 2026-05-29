const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    projectUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Portfolio ||
  mongoose.model("Portfolio", portfolioSchema);