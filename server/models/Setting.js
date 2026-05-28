const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      default: "NovaEdge Digital",
    },
    adminEmail: String,
    whatsappNumber: String,
    instagramLink: String,
    location: String,
    agencyBio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);