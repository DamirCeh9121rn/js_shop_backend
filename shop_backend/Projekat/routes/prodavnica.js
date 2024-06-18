const express = require("express");
const { sequelize, Prodavnica, Grad} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)


module.exports = route;

route.get("/", async (req,res) =>{
    try{
    const sveProdavnice = await Prodavnica.findAll();
        return res.json(sveProdavnice);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const prodavnica = await Prodavnica.findByPk( req.params.id);
        return res.json(prodavnica);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.prodavnicaValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let novaProdavnica = await Prodavnica.create(req.body);
        res.send(novaProdavnica);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req,res) =>{
    // try{
    //     let prodavnica = await Prodavnica.findByPk(req.params.id);
    //     prodavnica.ime = req.ime;
    //     prodavnica.gradID = req.gradID;
    //     prodavnica.updatedAt = Date.now();

    //     await prodavnica.save();
    //     res.sand(prodavnica);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Prodavnica.findOne({where: {id: req.params.id}
    }).then(prodavnica => {
        if(req.body.ime)
           prodavnica.ime = req.body.ime;
        if(req.body.gradID)
           prodavnica.gradID = req.body.gradID;

        prodavnica.updatedAt = Date.now();

        prodavnica.save()
           .then(prodavnica => res.json(prodavnica))
           .catch(err => res.status(500).json(err));
    })

});

route.delete("/:id", async (req,res) =>{

    // try{
    //     let prodavnica = await prodavnica.findByPk(req.params.id);
    //     await prodavnica.destroy();
    //     res.send(prodavnica);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }
    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Prodavnica.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
});