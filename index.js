const express = require("express");
const router = require("./router/user");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// require ("dotenv").config()

const app = express();
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  res.send("Welcome to RecyclePay API 🎉🎉🎉");
});
app.use("/api/v1/user", router);

mongoose
  .connect(URI)
  .then(() => {
    console.log("MongooseDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server connected successfully on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
