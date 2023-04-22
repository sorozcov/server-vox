/* -------------------------- Create MySQL Connection ------------------------- */
const mysql = require('mysql');

const conn = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});

conn.connect(function(err) {
    if (err) throw err;
    console.log(`MySQL Database ${process.env.DB_NAME} successfully connected to Server.`)
});

/* --------- Create our own query to handle with async/await easier --------- */
const query = (sql, args) => {
    return new Promise( ( resolve, reject ) => {
        conn.query( sql, args, ( err, rows ) => {
            if ( err )
                return reject( err );
            resolve(rows);
        } );
    } );
}

module.exports = {conn,query};