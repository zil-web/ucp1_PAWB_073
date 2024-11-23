const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Pastikan path ini benar

// Tambah data bibit
router.post("/", (req, res) => {
    const { nama, jenis, harga } = req.body;  // Pastikan data dikirim dengan nama yang benar

    db.query(
        "INSERT INTO bibit (nama, jenis, harga) VALUES (?, ?, ?)",
        [nama, jenis, harga],
        (err, result) => {
            if (err) {
                console.error("Error inserting data: " + err.message);
                res.status(500).send("Gagal menyimpan data bibit.");
                return;
            }
            res.send("Data bibit berhasil ditambahkan.");
        }
    );
});

// Tampilkan data bibit
router.get("/", (req, res) => {
    db.query("SELECT * FROM bibit", (err, results) => {
        if (err) {
            console.error("Error fetching data: " + err.message);
            res.status(500).send("Gagal mengambil data bibit.");
            return;
        }
        res.render("bibit", { bibit: results });
    });
});

// Update data bibit
router.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;

    db.query(
        "UPDATE bibit SET nama = ?, jenis = ?, harga = ? WHERE id = ?",
        [nama, jenis, harga, id],
        (err, result) => {
            if (err) {
                console.error("Error updating data: " + err.message);
                res.status(500).send("Gagal memperbarui data bibit.");
                return;
            }
            res.send("Data bibit berhasil diperbarui.");
        }
    );
});

// Delete data bibit
router.post("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM bibit WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting data: " + err.message);
            res.status(500).send("Gagal menghapus data bibit.");
            return;
        }
        res.send("Data bibit berhasil dihapus.");
    });
});

module.exports = router;
