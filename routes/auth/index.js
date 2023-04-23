const express = require("express");
const router = express.Router();
const authService = require('../../services/auth');
const jwt = require('jsonwebtoken');

/* ----------------------------- Signup Endpoint ---------------------------- */
router.post("/signup", async function (req, res, next) {
  try {
      let = {name, email, password} = req.body;
      let response = await authService.signUp(name,email,password);
      await res.json(response);
    } catch (err) {
      console.error(`Error, signup user. ${email}. `,err.message);
      next(err);
    }
  });

/* ----------------------------- Login Endpoint ---------------------------- */
router.post("/login", async function (req, res, next) {
    try {
        //TODO Again return error as JSON and not as throw error
        let = {email, password} = req.body;
        let response = await authService.login(email,password);
        if(response.length==0){ throw new Error("Cannot login with credentials provided.")}
        let user = JSON.parse(JSON.stringify(response[0]));
        let jwtToken = jwt.sign({
            userEmail: user.userEmail,
            userName: user.userName
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //Return JWT Token if authenticated
        await res.json(jwtToken);
       
      } catch (err) {
        console.error(`Error, could not login with ${email}. `,err.message);
        next(err);
      }
    });

  module.exports = router;