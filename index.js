 /* ----- Require dotenv, express, body-parser, cors and express-fileupload library to mount backend ----- */
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require("express-fileupload")

/* ------------------------ Connect to MySQL database ----------------------- */
const conn = require("./services/database");
const accommodationRoutes = require("./routes/accommodation")

/* ---------------------- Initiate Backend express app ---------------------- */
const app = express();

app.use(express.json());
app.use(cors()); // Only for development
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })); //fileUpload use to let server handle fileUploads

/* -------------------------- Add all API Endpoints ------------------------- */
app.use("/accommodation" , accommodationRoutes)


/* ------------------ Start to listen to petitions on port ------------------ */
const PORT = process.env.PORT;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});



module.exports = app;
