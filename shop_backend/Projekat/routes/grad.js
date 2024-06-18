const express = require("express");
const { sequelize, Grad} = require("../models");
const joiVal = require('./../joiVal/joiVal.js')
const authToken = require('./../auth_token/auth_token')

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(authToken)

module.exports = route;


route.get("/", async (req,res) =>{
    try{
        const sviGradovi = await Grad.findAll();
        res.json(sviGradovi);
    }catch{
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req,res) =>{
    try{
        const grad = await Grad.findByPk(req.params.id);
        return res.json(grad);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) =>{
    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        const validacija = joiVal.gradValidacija(req.body)
        if(validacija.error)
            return res.json({message: validacija.error.details[0].message})

        let noviGrad = await Grad.create(req.body);
        res.send(noviGrad);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }

});

route.put("/:id", async (req,res) =>{
    // try{
    //     let grad = await Grad.findByPk(req.params.id);
    //     grad.ime = req.ime;
    //     grad.updatedAt = Date.now();

    //     await grad.save();
    //     res.sand(grad);
    // }catch{
    //     res.status(500).json({ error: "Greska", data: err });
    // }

    if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

    Grad.findOne({where: {id: req.params.id}
    }).then(grad => {
        if(req.body.ime)
           grad.ime = req.body.ime;

        grad.updatedAt = Date.now();

        grad.save()
           .then(grad => res.json(grad))
           .catch(err => res.status(500).json(err));
    })



});

route.delete("/:id", async (req,res) =>{

    try{
        if(req.korisnik.tip !== "ADMIN" && req.korisnik.tip !== "MODERATOR")
            return res.status(401).json({message: 'Unauthorized'})

        let grad = await Grad.findByPk(req.params.id);
        await grad.destroy();
        res.send(grad);
    }catch{
        res.status(500).json({ error: "Greska", data: err });
    }
});