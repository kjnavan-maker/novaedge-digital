const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);