const express = require("express");
const { sequelize, Skladiste} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const svaSkladista = await Skladiste.findAll();
        return res.json(svaSkladista);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const skladiste = await Skladiste.findByPk(req.params.id);
        return res.json(skladiste);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.skladisteValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let novoSkladiste = await Skladiste.create(req.body);
        res.send(novoSkladiste);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let skladiste = await Skladiste.findByPk(req.params.id);
    //     skladiste.adresa = req.adresa;
    //     skladiste.prodavnicaID = req.prodavnicaID;
    //     skladiste.updatedAt = Date.now();

    //     await skladiste.save();
    //     res.sand(skladiste);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Skladiste.findOne({where: {id: req.params.id}
    }).then(skladiste => {
        if(req.body.adresa)
           skladiste.adresa = req.body.adresa;
        if(req.body.prodavnicaID)
           skladiste.prodavnicaID = req.body.prodavnicaID;

        skladiste.updatedAt = Date.now();

        skladiste.save()
           .then(skladiste => res.json(skladiste))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let skladiste = await Skladiste.findByPk(req.params.id);
    //     await skladiste.destroy();
    //     res.send(skladiste);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Skladiste.findOne({where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});