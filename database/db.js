const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Default username MySQL
    password: "", // Default password MySQL
    database: "pertanian", // Nama database
});

// Periksa koneksi
db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal:", err.message);
        return;
    }
    console.log("Koneksi ke database berhasil.");
});

module.exports = db;
