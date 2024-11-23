const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',    // Atur sesuai dengan host MySQL Anda
    user: 'root',         // Username MySQL
    password: '',         // Password MySQL
    database: 'pertanian' // Nama database yang Anda gunakan
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.message);
    } else {
        console.log("Connected to the database!");
    }
});

module.exports = db;
