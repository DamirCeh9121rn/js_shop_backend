const express = require("express");
const { sequelize, Stanje} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const svaStanja = await Stanje.findAll();
        return res.json(svaStanja);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const stanje = await Stanje.findByPk(req.params.id);
        return res.json(stanje);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.stanjeValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})
        let novoStanje = await Stanje.create(req.body);
        res.send(novoStanje);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let stanje = await Stanje.findByPk(req.params.id);
    //     stanje.kolicina = req.kolicina;
    //     stanje.skladisteID = req.skladisteID;
    //     stanje.proizvodID = req.proizvodID;
    //     stanje.updatedAt = Date.now();

    //     await stanje.save();
    //     res.sand(stanje);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Stanje.findOne({where: {id: req.params.id}
    }).then(stanje => {
        if(req.body.kolicina)
           stanje.kolicina = req.body.kolicina;
        if(req.body.skladisteID)
           stanje.skladisteID = req.body.skladisteID;
        if(req.body.proizvodID)
           stanje.proizvodID = req.body.proizvodID;

        stanje.updatedAt = Date.now();

        stanje.save()
           .then(stanje => res.json(stanje))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let stanje = await Stanje.findByPk(req.params.id);
    //     await stanje.destroy();
    //     res.send(stanje);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Stanje.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});