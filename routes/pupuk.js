const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Create (Menambahkan Data Pupuk)
router.post("/add", (req, res) => {
    const { nama, jenis, harga } = req.body;

    db.query(
        "INSERT INTO pupuk (nama, jenis, harga) VALUES (?, ?, ?)",
        [nama, jenis, harga],
        (err, result) => {
            if (err) {
                console.error("Error saat menambahkan data pupuk:", err.message);
                res.status(500).send("Gagal menambahkan data pupuk.");
                return;
            }
            console.log("Data pupuk berhasil ditambahkan:", result);
            res.redirect("/pupuk");
        }
    );
});

// Read (Menampilkan Data Pupuk)
router.get("/", (req, res) => {
    db.query("SELECT * FROM pupuk", (err, results) => {
        if (err) {
            console.error("Error saat mengambil data pupuk:", err.message);
            res.status(500).send("Gagal mengambil data pupuk.");
            return;
        }
        res.render("pupuk", { pupuk: results });
    });
});

// Update (Memperbarui Data Pupuk)
router.post("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;

    db.query(
        "UPDATE pupuk SET nama = ?, jenis = ?, harga = ? WHERE id = ?",
        [nama, jenis, harga, id],
        (err, result) => {
            if (err) {
                console.error("Error saat memperbarui data pupuk:", err.message);
                res.status(500).send("Gagal memperbarui data pupuk.");
                return;
            }
            console.log("Data pupuk berhasil diperbarui:", result);
            res.redirect("/pupuk");
        }
    );
});

// Delete (Menghapus Data Pupuk)
router.post("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM pupuk WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error saat menghapus data pupuk:", err.message);
            res.status(500).send("Gagal menghapus data pupuk.");
            return;
        }
        console.log("Data pupuk berhasil dihapus:", result);
        res.redirect("/pupuk");
    });
});

module.exports = router;
