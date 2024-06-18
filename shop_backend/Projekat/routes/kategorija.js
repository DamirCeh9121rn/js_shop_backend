const express = require("express");
const { sequelize, Kategorija} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const route = express.Router();
const authToken = require('./../auth_token/auth_token')

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sveKategorije = await Kategorija.findAll();
        return res.json(sveKategorije);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        return res.json(kategorija);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.kategorijaValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let novaKategorija = await Kategorija.create(req.body);
        res.send(novaKategorija);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let kategorija = await Kategorija.findByPk(req.params.id);
    //     kategorija.naziv = req.naziv;
    //     kategorija.updatedAt = Date.now();

    //     await kategorija.save();
    //     res.sand(kategorija);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})


    Kategorija.findOne({where:{id: req.params.id}})
       .then(kategorija => {
           if(req.body.naziv)
              kategorija.naziv = req.body.naziv
        
            kategorija.updatedAt = Date.now();

        kategorija.save()
           .then(kategorija => res.json(kategorija))
           .catch(err => res.status(500).json(err));
        
       })

});

route.delete("/:id", async (req,res) =>{

    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        let kategorija = await Kategorija.findByPk(req.params.id);
        await kategorija.destroy();
        res.send(kategorija);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});