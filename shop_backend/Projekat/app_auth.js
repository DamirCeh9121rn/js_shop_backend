const express = require('express');
const app = express();
const { sequelize, Korisnik} = require("./models");
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joiValidation = require('./joiVal/joiVal.js');
require('dotenv').config()

let corsOptions = {
    origin: ['http://localhost:8000','http://localhost:8001','http://localhost:8080'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());


app.post('/register', (req,res)=>{
    const validation = joiValidation.korisnikValidacija(req.body);

    if(validation.error)
        return res.send({message: validation.error.details[0].message});


    Korisnik.create({
        ime: req.body.ime,
        prezime: req.body.prezime,
        email: req.body.email,
        sifra: bcrypt.hashSync(req.body.sifra, 15),
        tip: req.body.tip
    }).then(row => {
        const korisnik = {id: row.id, ime: row.ime, prezime: row.prezime, email: row.email, sifra: row.sifra, tip: row.tip};
        const token = jwt.sign(korisnik, process.env.ACCESS_TOKEN_SECRET)
        res.json({token: token});
    }).catch(err => res.status(500).json(err));
});

app.post('/login', (req,res) => {
    //DODATI VALIDATCIJU ZA LOGIN
    console.log(req.body)
    Korisnik.findOne({where: {email: req.body.email}})
        .then(row => {

            if(bcrypt.compareSync(req.body.sifra, row.sifra)){
                const korisnik = {id: row.id, ime: row.ime, prezime: row.prezime, email: row.email, sifra: row.sifra, tip: row.tip};
                const token = jwt.sign(korisnik, process.env.ACCESS_TOKEN_SECRET)
                res.json({token: token});
            }else
                res.status(400).json({message: "Pogresna sifra"});
        })
        .catch(err => res.status(500).json({error: err}));
})


app.listen({ port: 8002 }, async () => {
    await sequelize.authenticate();
    console.log('Started server on localhost:8002')
})