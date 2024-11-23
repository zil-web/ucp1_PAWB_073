const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Halaman input bibit
router.get("/input", (req, res) => {
  res.render("bibit_input", { title: "Input Data Bibit" });
});

// Tambah data bibit
router.post("/", (req, res) => {
  const { id, nama, jenis, harga } = req.body;

  db.query(
    "INSERT INTO bibit (id, nama, jenis, harga) VALUES (?, ?, ?, ?)",
    [id, nama, jenis, harga],
    (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).send("Gagal menyimpan data.");
        return;
      }
      res.send("Data bibit berhasil ditambahkan.");
    }
  );
});

module.exports = router;
