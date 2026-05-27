const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    business: String,
    service: String,
    budget: String,
    status: {
      type: String,
      default: "New",
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);