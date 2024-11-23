const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pertanian", // Ganti sesuai nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi database gagal: " + err.message);
        return;
    }
    console.log("Terhubung ke database.");
});

module.exports = db;
