const express = require("express");
const { sequelize, Stavka} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sveStavke = await Stavka.findAll();
        return res.json(sveStavke);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const stavka = await Stavka.findByPk(req.params.id);
        return res.json(stavka);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.stavkaValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let novaStavka = await Stavka.create(req.body);
        res.send(novaStavka);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let stavka = await Stavka.findByPk(req.params.id);
    
    //     stavka.kolicina = req.kolicina;
    //     stavka.cena = req.cena;
    //     stavka.prizvod = req.prizvod;
    //     stavka.racunID = req.racunID
    //     stavka.updatedAt = Date.now();

    //     await stavka.save();
    //     res.sand(stavka);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Stavka.findOne({where: {id: req.params.id}
    }).then(stavka => {
        if(req.body.kolicina)
           stavka.kolicina = req.body.kolicina;
        if(req.body.cena)
           stavka.cena = req.body.cena;
        if(req.body.proizvodID)
           stavka.proizvodID = req.body.proizvodID;
        if(req.body.racunID)
           stavka.racunID = req.body.racunID;

        stavka.updatedAt = Date.now();

        stavka.save()
           .then(stavka => res.json(stavka))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let stavka = await Stavka.findByPk(req.params.id);
    //     await stavka.destroy();
    //     res.send(stavka);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Stavka.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))

});