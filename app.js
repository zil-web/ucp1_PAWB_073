require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware untuk parsing form data
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

const pupukRouter = require('./routes/Pertanian'); // Pastikan path benar
app.use('/', pupukRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
