const express = require("express");
const router = express.Router();
const accomodationServices = require('../../services/accommodation');

// TODO PROTECT WITH JWT TOKEN
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
      let response = await accomodationServices.getAccommodations();
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get accommodations. `, err.message);
      next(err);
    }
  });


// TODO PROTECT WITH JWT TOKEN
/* ------------------ Get accommodations list with filters ------------------ */
router.get("/getList", async function (req, res, next) {
  try {
      let {minPrice,maxPrice,numberOfRooms} = req.query;
      let response = await accomodationServices.getAccommodationsFiltered(minPrice, maxPrice, numberOfRooms);
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get accommodations. `, err.message);
      next(err);
    }
  });

/* ---------------------------- Get average price --------------------------- */
router.get("/getAveragePriceAccommodations", async function (req, res, next) {
  try {
      let {latitude,longitude,distanceKm} = req.query;
      if([latitude,longitude,distanceKm].filter(s=>s==undefined || s==null).length>0) throw new Error("All params need to be specified. <latitude, longitude and distanceKm>.")
      let response = await accomodationServices.getAveragePriceAccommodations(latitude, longitude, distanceKm);
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get average price of accommodations. `, err.message);
      next(err);
    }
  });


/* ---------------------- Get accommodations in bounds ---------------------- */
  router.get("/getAccommodationInBounds", async function (req, res, next) {
  try {
      let {latitude,longitude,distanceKm} = req.query;
      if([latitude,longitude,distanceKm].filter(s=> s==undefined || s==null).length>0) throw new Error("All params need to be specified. <latitude, longitude and distanceKm>.")
      let response = await accomodationServices.getAccommodationsInBounds(latitude, longitude, distanceKm);
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get accommodations in bounds. `, err.message);
      next(err);
    }
  });

module.exports = router;