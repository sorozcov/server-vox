const express = require("express");
const router = express.Router();
const accomodationServices = require('../../services/accommodation');
const jwt = require("jsonwebtoken");

/* -------------- Upload CSV File with accommodations endpoint -------------- */
router.post("/uploadCSVFile", async function (req, res, next) {
  try {
      // Protected with JWT Token
      let token = req.headers.authorization && req.headers.authorization.includes("Bearer ") ? req.headers.authorization.split("Bearer ")[1] : null;
      if (token==null) throw new Error("JWT Token was not sent on request. Please send the token.");
      if(!await jwt.verify(token, process.env.JWT_SECRET)) throw new Error("JWT Token is not valid. Please sign in to get a new token or verify your token again.");

      
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


/* ------------------ Get accommodations list with filters ------------------ */
router.get("/getList", async function (req, res, next) {
  try {
      // Protected with JWT Token
      let token = req.headers.authorization && req.headers.authorization.includes("Bearer ") ? req.headers.authorization.split("Bearer ")[1] : null;
      if (token==null) throw new Error("JWT Token was not sent on request. Please send the token.");
      if(!await jwt.verify(token, process.env.JWT_SECRET)) throw new Error("JWT Token is not valid. Please sign in to get a new token or verify your token again.");

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