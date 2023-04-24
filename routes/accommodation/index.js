const express = require("express");
const router = express.Router();
const accomodationServices = require('../../services/accommodation');
const jwt = require("jsonwebtoken");
const jsonCsvConvert = require('json-2-csv');
const PDFDocument = require("pdfkit-table");
const fs = require('fs');
const {uploadFile} = require('../../services/firebase-storage');

/* -------------- Upload CSV File with accommodations endpoint -------------- */
router.post("/uploadCSVFile", async function (req, res, next) {
  try {
      // Protected with JWT Token
      // let token = req.headers.authorization && req.headers.authorization.includes("Bearer ") ? req.headers.authorization.split("Bearer ")[1] : null;
      // if (token==null) throw new Error("JWT Token was not sent on request. Please send the token.");
      // if(!await jwt.verify(token, process.env.JWT_SECRET)) throw new Error("JWT Token is not valid. Please sign in to get a new token or verify your token again.");

      if(!req.files){ throw new Error("CSV File not provided.")}
      let response = await accomodationServices.uploadAccommodationsFromFile(req.files)
      await res.json(response)
    } catch (err) {
      console.error(`Error uploading CSVFile. `, err.message);
      // next(err);
      res.json(err);
    }
  });

/* ----------------------- Get accomodations endpoint ----------------------- */
router.get("/", async function (req, res, next) {
  try {
      let response = await accomodationServices.getAccommodations();
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get accommodations. `, err.message);
      // next(err);
      res.json(err);
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
      // next(err);
      res.json(err);
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
      // next(err);
      res.json(err);
    }
  });


  /* ---------------------- Get accommodations in bounds ---------------------- */
  router.get("/getAccommodationsInBounds", async function (req, res, next) {
  try {
      let {latitude,longitude,distanceKm} = req.query;
      if([latitude,longitude,distanceKm].filter(s=> s==undefined || s==null).length>0) throw new Error("All params need to be specified. <latitude, longitude and distanceKm>.")
      let response = await accomodationServices.getAccommodationsInBounds(latitude, longitude, distanceKm);
      await res.json(response);
    } catch (err) {
      console.error(`Error trying to get accommodations in bounds. `, err.message);
      // next(err);
      res.json(err);
    }
  });

  /* ------------------- Get Accommodations Report Endpoint ------------------- */
  router.get("/getAccommodationsReport", async function (req, res, next) {
    try {
        let {minPrice,maxPrice,numberOfRooms, latitude,longitude,distanceKm, reportType} = req.query;
        if(!['csv','pdf'].includes(reportType)) throw new Error("Report Type param must be sent of type csv or pdf.")
        if([latitude,longitude,distanceKm].filter(s=> s==undefined || s==null).length>0) throw new Error("All params need to be specified. <latitude, longitude and distanceKm>.")
        let response = await accomodationServices.getAccommodationsReport(minPrice,maxPrice,numberOfRooms, latitude, longitude, distanceKm);
        //Now we generate csv or pdf file and save it on server to download.
        //TODO Make csv report and pdf report more beautiful. Add params on report and file location on Cloud server
        let reportJson = JSON.parse(JSON.stringify(response));
        if(reportType=='csv'){
          let reportCsv = await jsonCsvConvert.json2csv(reportJson);
          let fileName = `${Date.now()}.csv`;
          let tempFileDirectory = `${process.env.FILES_PATH}${fileName}`;
          fs.writeFileSync(tempFileDirectory,reportCsv)
          let file = fs.readFileSync(tempFileDirectory);
          let fileStorage = await uploadFile(file,fileName)
          fs.unlinkSync(tempFileDirectory)
          await res.json({file:fileStorage})
        }else if(reportType=='pdf'){
          //TODO PDF NOT WORKING CORRECTLY
          let doc = new PDFDocument({ margin: 30, size: 'A4' });
          let fileName = `${Date.now()}.pdf`;
          let tempFileDirectory = `${process.env.FILES_PATH}${fileName}`;
          let pipe = await doc.pipe(fs.createWriteStream(tempFileDirectory))
          const headers = [
            'AccommodationLatitude',
            'AccommodationLongitude',
            'AccommodationId',
            'AccommodationTitle',
            // 'AccommodationAdvertiser',
            // 'AccommodationDescription',
            // 'AccommodationIsReformed',
            // 'AccommodationPhone',
            // 'AccommodationType',
            'AccommodationPrice',
            'AccommodationPricePerMeter',
          
          ]
          const table = {
            title: "Accommodations Report",
            headers: headers,
            rows: reportJson.map(accom=>headers.map(header=>accom[header] ?? ''))
          };
          await doc.table(table, { 
          });
          await doc.end();
          

          pipe.on('finish', async function() {
              let file = fs.readFileSync(tempFileDirectory);
              let fileStorage = await uploadFile(file,fileName)
              fs.unlinkSync(tempFileDirectory)
              await res.json({file:fileStorage})
            
           });
          
      
          
          
        
        }
      } catch (err) {
        console.error(`Error trying to get accommodations report. `, err.message);
        // next(err);
        res.json(err);
      }
    });


module.exports = router;