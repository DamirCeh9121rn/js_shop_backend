const express = require("express");
const { sequelize, Korisnik} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const route = express.Router();
const bcrypt = require('bcrypt');
const authToken = require('./../auth_token/auth_token')

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sviKorisnici = await Korisnik.findAll();
        return res.json(sviKorisnici);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const korisnik = await Korisnik.findByPk(req.params.id);
        return res.json(korisnik);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.korisnikValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let noviKorisnik = await Korisnik.create({
            ime: req.body.ime,
            prezime: req.body.prezime,
            email: req.body.email,
            sifra: bcrypt.hashSync(req.body.sifra,15),
            tip: req.body.tip
          });
        res.send(noviKorisnik);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let korisnik = await Korisnik.findByPk(req.params.id);
    //     korisnik.ime = req.ime;
    //     korisnik.prezime = req.prezime;
    //     korisnik.email = req.email;
    //     korisnik.sifra = req.sifra;
    //     korisnik.admin = req.admin;
    //     korisnik.moderator = req.moderator;
    //     korisnik.updatedAt = Date.now();

    //     await korisnik.save();
    //     res.sand(korisnik);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }

    if(req.korisnik.tip !== "ADMIN")
            return res.status(401).json({message: 'Unauthorized'})


    Korisnik.findOne({where: {id: req.params.id}
    }).then(korisnik => {
        if(req.body.ime)
           korisnik.ime = req.body.ime;
        if(req.body.prezime)
           korisnik.prezime = req.body.prezime;
        if(req.body.email)
           korisnik.email = req.body.email;
        if(req.body.sifra)
           korisnik.sifra = bcrypt.hashSync(req.body.sifra,15);
        if(req.body.tip)
           korisnik.tip = req.body.tip;

           
        korisnik.updatedAt = Date.now();

        korisnik.save()
           .then(korisnik => res.json(korisnik))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    try{
        if(req.korisnik.tip !== "ADMIN")
            return res.status(401).json({message: 'Unauthorized'})

        let korisnik = await Korisnik.findByPk(req.params.id);
        await korisnik.destroy();
        res.send(korisnik);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});