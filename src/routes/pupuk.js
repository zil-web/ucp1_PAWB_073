
const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Tambah data pupuk
router.post("/", (req, res) => {
    console.log(req.body); // Debugging: cek apa yang ada di req.body
    const { id, nama, jenis, harga } = req.body;  // Pastikan data dikirim dengan nama yang benar

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

// Tampilkan data pupuk
router.get("/", (req, res) => {
    db.query("SELECT * FROM pupuk", (err, results) => {
        if (err) {
            console.error("Error fetching data: " + err.message);
            res.status(500).send("Gagal mengambil data pupuk.");
            return;
        }
        res.render("pupuk", { pupuk: results });
    });
});

// Update data pupuk
router.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;

    db.query(
        "UPDATE pupuk SET nama = ?, jenis = ?, harga = ? WHERE id = ?",
        [nama, jenis, harga, id],
        (err, result) => {
            if (err) {
                console.error("Error updating data: " + err.message);
                res.status(500).send("Gagal memperbarui data pupuk.");
                return;
            }
            res.send("Data pupuk berhasil diperbarui.");
        }
    );
});

// Delete data pupuk
router.post("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM pupuk WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting data: " + err.message);
            res.status(500).send("Gagal menghapus data pupuk.");
            return;
        }
        res.send("Data pupuk berhasil dihapus.");
    });
});

module.exports = router;
