const Setting = require("../models/Setting");

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        agencyName: "NovaEdge Digital",
        adminEmail: "hello@novaedgedigital.com",
        whatsappNumber: "+94 76 430 4068",
        instagramLink: "@novaedgedigital",
        location: "Sri Lanka",
        agencyBio:
          "Premium digital marketing, branding, websites, and creative technology solutions for modern businesses.",
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};