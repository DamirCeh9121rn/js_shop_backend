const express = require("express");
const { sequelize, Proizvod} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sviPrizvodi = await Proizvod.findAll();
        return res.json(sviPrizvodi);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const proizvod = await Proizvod.findByPk(req.params.id);
        return res.json(proizvod);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        const validacija = joiVal.proizvodValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let noviProizvod = await Proizvod.create(req.body);
        res.send(noviProizvod);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let proizvod = await Proizvod.findByPk(req.params.id);
    //     proizvod.naziv = req.naziv;
    //     proizvod.cena = req.cena;
    //     proizvod.kategorijaID = req.kategorijaID;
    //     proizvod.updatedAt = Date.now();

    //     await proizvod.save();
    //     res.sand(proizvod);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }

    Proizvod.findOne({where: {id: req.params.id}
    }).then(proizvod => {
        if(req.body.naziv)
           proizvod.naziv = req.body.naziv;
        if(req.body.cena)
           proizvod.cena = req.body.cena;
        if(req.body.kategorijaID)
           proizvod.kategorijaID = req.body.kategorijaID;
        proizvod.updatedAt = Date.now();

        proizvod.save()
           .then(proizvod => res.json(proizvod))
           .catch(err => res.status(500).json(err));
    })
});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let proizvod = await Proizvod.findByPk(req.params.id);
    //     await proizvod.destroy();
    //     res.send(proizvod);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    Proizvod.findOne({where: { id: req.params.id } })
    .then(row => {
        row.destroy()
            .then(row => res.json(row))
            .catch(err => res.status(500).json(err))
    })
    .catch(err => res.status(500).json(err))
});