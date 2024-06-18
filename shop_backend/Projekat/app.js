const path = require("path");
const express = require("express");
const { sequelize, Grad, Prodavnica, Kategorija, Proizvod, Korisnik, Skladiste, Stanje, Recenzija, Racun, Stavka } = require("./models");
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: ['http://localhost:8001','http://localhost:8002','http://localhost:8080'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json())


const gradRoutes = require("./routes/grad.js");
app.use("/admin/grad", gradRoutes);

const prodavnicaRoutes = require("./routes/prodavnica.js");
app.use("/admin/prodavnica", prodavnicaRoutes);

const kategorijaRouts = require("./routes/kategorija.js");
app.use("/admin/kategorija", kategorijaRouts);

const proizvodRouts = require("./routes/proizvod.js");
app.use("/admin/proizvod", proizvodRouts);

const korisnikRouts = require("./routes/korisnik.js");
app.use("/admin/korisnik", korisnikRouts);

const skladisteRouts = require("./routes/skladiste.js");
app.use("/admin/skladiste", skladisteRouts);

const stanjeRouts = require("./routes/stanje.js");
app.use("/admin/stanje", stanjeRouts);

const recenzijaRouts = require("./routes/recenzija.js");
app.use("/admin/recenzija", recenzijaRouts);

const racunRouts = require("./routes/racun.js");
app.use("/admin/racun", racunRouts);

const stavkaRouts = require("./routes/stavka.js");
app.use("/admin/stavka", stavkaRouts);


app.listen({ port:8000 }, async () => {
    await sequelize.authenticate()
    console.log("Started server on localhost:8000");
});