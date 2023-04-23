const db = require("../database");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

/* ----------------------------- Signup service ----------------------------- */
async function signUp(name,email,password) {
    //TODO still could add exists userEmail before trying to insert
    //Right now it is being handled as an sql error duplicate entry return
    let query =  `INSERT INTO Users
    (
    userName,
    userEmail,
    password)
    VALUES
    ('${name}',
    '${email}',
    '${md5(password)}');`.replace(/(\r\n|\n|\r)/gm, "");
    let result = await db.query(query);
    return result;
}


/* ----------------------------- Login service  ----------------------------- */
async function login(email,password) {
    let query =  `SELECT * from Users where userEmail='${email}' && password='${md5(password)}'`;
    let result = await db.query(query);
    return result;
}

//TODO Create a token validation for JWT Middleware 

//TODO Create a JWT Renew API after it has expire

module.exports = {
    signUp,
    login
}
