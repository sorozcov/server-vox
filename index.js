 /* ----- Require dotenv, express, body-parser and cors library to mount backend ----- */
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");


/* -------------- Add API routes and connect to MySQL database -------------- */
// const router = require("./routes");
const conn = require("./services/database");


/* ---------- Run backend on port and start to listen to petitions ---------- */
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Only for development
// app.use(api, router);


const PORT = process.env.PORT;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});



//Example of Query
// conn.query(`select * from Accommodation`, (err,resp)=>{
//     console.log(resp)
// })

module.exports = app;
