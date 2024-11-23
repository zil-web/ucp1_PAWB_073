const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Halaman input pupuk
router.get("/input", (req, res) => {
  res.render("pupuk_input", { title: "Input Data Pupuk" });
});

// Tambah data pupuk
router.post("/", (req, res) => {
  const { id, nama, jenis, harga } = req.body;

  db.query(
    "INSERT INTO pupuk (id, nama, jenis, harga) VALUES (?, ?, ?, ?)",
    [id, nama, jenis, harga],
    (err, result) => {
      if (err) {
        console.error("Error inserting data: " + err.message);
        res.status(500).send("Gagal menyimpan data.");
        return;
      }
      res.send("Data pupuk berhasil ditambahkan.");
    }
  );
});

module.exports = router;
