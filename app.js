const express = require("express");
const bodyParser = require("body-parser");
const bibitRouter = require("./routes/bibit");
const pupukRouter = require('express').Router();
const pupukRoutes = require('./src/routes/pupuk.js');
const bibitRoutes = require('./src/routes/bibit.js');
const path = require("path");
// Menentukan lokasi folder views
app.set("views", path.join(__dirname, "src", "views"));

// Mengatur view engine ke EJS
app.set("view engine", "ejs");





// Koneksi Database (ini bisa dipisah ke file lain untuk struktur yang lebih baik)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',    // Menggunakan localhost sebagai fallback
  user: process.env.DB_USER || 'root',         // Ganti dengan username Anda
  password: process.env.DB_PASSWORD || '',     // Ganti jika password digunakan
  database: process.env.DB_NAME || 'pertanian', // Ganti dengan nama database
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = connection;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.use("/pupuk", pupukRouter);
app.use("/bibit", bibitRouter);


// Jangan mendeklarasikan pupukRouter lebih dari sekali

// Jalankan Server
app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
