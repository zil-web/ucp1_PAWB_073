const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Create (Menambahkan Data Bibit)
router.post("/add", (req, res) => {
    const { nama, jenis, harga } = req.body;

    db.query(
        "INSERT INTO bibit (nama, jenis, harga) VALUES (?, ?, ?)",
        [nama, jenis, harga],
        (err, result) => {
            if (err) {
                console.error("Error saat menambahkan data bibit:", err.message);
                res.status(500).send("Gagal menambahkan data bibit.");
                return;
            }
            console.log("Data bibit berhasil ditambahkan:", result);
            res.redirect("/bibit");
        }
    );
});

// Read (Menampilkan Data Bibit)
router.get("/", (req, res) => {
    db.query("SELECT * FROM bibit", (err, results) => {
        if (err) {
            console.error("Error saat mengambil data bibit:", err.message);
            res.status(500).send("Gagal mengambil data bibit.");
            return;
        }
        res.render("bibit", { bibit: results });
    });
});

// Update (Memperbarui Data Bibit)
router.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;

    db.query(
        "UPDATE bibit SET nama = ?, jenis = ?, harga = ? WHERE id = ?",
        [nama, jenis, harga, id],
        (err, result) => {
            if (err) {
                console.error("Error saat memperbarui data bibit:", err.message);
                res.status(500).send("Gagal memperbarui data bibit.");
                return;
            }
            console.log("Data bibit berhasil diperbarui:", result);
            res.redirect("/bibit");
        }
    );
});

// Delete (Menghapus Data Bibit)
router.post("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM bibit WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error saat menghapus data bibit:", err.message);
            res.status(500).send("Gagal menghapus data bibit.");
            return;
        }
        console.log("Data bibit berhasil dihapus:", result);
        res.redirect("/bibit");
    });
});

module.exports = router;
