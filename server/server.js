const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const inquiryRoutes = require("./routes/inquiryRoutes");
const customerRoutes = require("./routes/customerRoutes");
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("NovaEdge Digital Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});