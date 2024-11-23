require('dotenv').config();  // Pastikan dotenv hanya dipanggil sekali
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const pupukRoutes = require('./src/routes/pupuk.js');
const bibitRoutes = require('./src/routes/bibit.js');

// Koneksi Database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',       // Gunakan localhost jika tidak ada variabel lingkungan
  user: process.env.DB_USER || 'root',            // Ganti dengan username database Anda
  password: process.env.DB_PASSWORD || '',        // Isi jika menggunakan password
  database: process.env.DB_NAME || 'nama_database' // Ganti dengan nama database Anda
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Inisialisasi Aplikasi
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Untuk parsing JSON jika diperlukan

// Atur lokasi folder views dan template engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/pupuk', pupukRoutes);
app.use('/bibit', bibitRoutes);

// Route utama untuk menampilkan index.ejs
app.get('/', (req, res) => {
  res.render('index', { title: 'Selamat Datang', message: 'Aplikasi Pertanian' });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
