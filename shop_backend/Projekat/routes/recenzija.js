const express = require("express");
const { sequelize, Recenzija} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sveRecenzije = await Recenzija.findAll();
        return res.json(sveRecenzije);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const recenzija = await Recenzija.findByPk(req.params.id);
        return res.json(recenzija);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.recenzijaValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let novaRecenzija = await Recenzija.create(req.body);
        res.send(novaRecenzija);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let recenzija = await Recenzija.findByPk(req.params.id);
        
    //     recenzija.ocena= req.ocena;
    //     recenzija.opis = req.opis;
    //     recenzija.proizvID = req.proizvID;
    //     recenzija.idKorisnik = req.idKorisnik;
    //     recenzija.updatedAt = Date.now();

    //     await recenzija.save();
    //     res.sand(recenzija);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Recenzija.findOne({where: {id: req.params.id}
    }).then(recenzija => {
        if(req.body.ocena)
           recenzija.ocena = req.body.ocena;
        if(req.body.opis)
           recenzija.opis = req.body.opis;
        if(req.body.proizvodID)
           recenzija.proizvodID = req.body.proizvodID;
        if(req.body.korisnikID)
           recenzija.korisnikID = req.body.korisnikID;

        recenzija.updatedAt = Date.now();

        recenzija.save()
           .then(recenzija => res.json(recenzija))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let recenzija = await Recenzija.findByPk(req.params.id);
    //     await recenzija.destroy();
    //     res.send(recenzija);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Recenzija.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});