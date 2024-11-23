const express = require("express");
const bodyParser = require("body-parser");
const pupukRouter = require("./routes/pupuk");
const bibitRouter = require("./routes/bibit");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.use("/pupuk", pupukRouter);
app.use("/bibit", bibitRouter);

// Jalankan Server
app.listen(8080, () => {
    console.log("Server berjalan di http://localhost:8080");
});
