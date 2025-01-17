const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function ( req, res, next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.status(401).json({ message: "Nema tokena"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, korisnik) => {
        if(err)
            return res.status(403).json({ message: err})
        
        req.korisnik = korisnik;
        next();
    })


}