const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Pastikan path ini benar

// Tambah data pupuk
router.post("/", (req, res) => {
    const { nama, jenis, harga } = req.body;

    db.query(
        "INSERT INTO pupuk (nama, jenis, harga) VALUES (?, ?, ?)",
        [nama, jenis, harga],
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

// Tampilkan data pupuk
router.get("/", (req, res) => {
    db.query("SELECT * FROM pupuk", (err, results) => {
        if (err) {
            console.error("Error fetching data: " + err.message);
            res.status(500).send("Gagal mengambil data.");
            return;
        }
        res.render("pupuk", { pupuk: results });
    });
});

module.exports = router;
