const express = require("express");
const { sequelize, Racun} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sviRacuni = await Racun.findAll();
        return res.json(sviRacuni);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const racun = await Racun.findByPk(req.params.id);
        return res.json(racun);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.racunValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let noviRacun = await Racun.create(req.body);
        res.send(noviRacun);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let racun = await Racun.findByPk(req.params.id);
    
    //     racun.ukupnaCena = req.ukupnaCena;
    //     racun.datum = req.datum;
    //     racun.korisnik = req.korisnik;
    //     racun.prodavnica = req.prodavnica;
    //     racun.updatedAt = Date.now();

    //     await racun.save();
    //     res.sand(racun);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Racun.findOne({where: {id: req.params.id}
    }).then(racun => {
        if(req.body.ukupnaCena)
           racun.ukupnaCena = req.body.ukupnaCena;
        if(req.body.datum)
           racun.datum = req.body.datum;
        if(req.body.korisnikID)
           racun.korisnikID = req.body.korisnikID;
        if(req.body.prodavnicaID)
           racun.prodavnicaID = req.body.prodavnicaID;
        racun.updatedAt = Date.now();

        racun.save()
           .then(racun => res.json(racun))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let racun = await Racun.findByPk(req.params.id);
    //     await racun.destroy();
    //     res.send(racun);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Racun.findOne({where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});