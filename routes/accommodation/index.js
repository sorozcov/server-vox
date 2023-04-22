const express = require("express");
const router = express.Router();
const accomodationServices = require('../../services/accommodation');


/* -------------- Upload CSV File with accommodations endpoint -------------- */
router.post("/uploadCSVFile", async function (req, res, next) {
  try {
      if(!req.files){ throw new Error("CSV File not provided.")}
      let response = await accomodationServices.uploadAccommodationsFromFile(req.files)
      await res.json(response)
    } catch (err) {
      console.error(`Error uploading CSVFile. `, err.message);
      next(err);
    }
  });

/* ----------------------- Get accomodations endpoint ----------------------- */
router.get("/", async function (req, res, next) {
  try {
      console.log(req.query);
      let response = await accomodationServices.getAccommodations();
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get accommodations. `, err.message);
      next(err);
    }
  });



module.exports = router;