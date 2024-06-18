const Joi = require('joi')
module.exports = {gradValidacija, kategorijaValidacija, prodavnicaValidacija, proizvodValidacija,
                korisnikValidacija, skladisteValidacija, stanjeValidacija, recenzijaValidacija,
                racunValidacija, stavkaValidacija}

function gradValidacija(grad){

    const test = Joi.object().keys({
        ime: Joi.string().min(2).max(20).required()
    })
    return test.validate(grad)
}

function kategorijaValidacija(kategorija){

    const test = Joi.object().keys({
        naziv: Joi.string().min(1).max(20).required()
    })
    return test.validate(kategorija)
}

function prodavnicaValidacija(prodavnica){

    const test = Joi.object().keys({
        ime: Joi.string().min(1).max(20).required(),
        gradID: Joi.number().min(1).required()
    })
    return test.validate(prodavnica)
}


function proizvodValidacija(proizvod){

    const test = Joi.object().keys({
        naziv: Joi.string().min(1).max(20).required(),
        cena: Joi.number().min(1).required(),
        kategorijaID: Joi.number().min(1).required()
    })
    return test.validate(proizvod)
}

function korisnikValidacija(korisnik){
    const test = Joi.object().keys({
        ime: Joi.string().min(1).max(20).required(),
        prezime: Joi.string().min(1).max(20).required(),
        email: Joi.string().trim().email().required(),
        sifra: Joi.string().min(4),
        tip: Joi.string().min(1)
        })
    return test.validate(korisnik)
}

function skladisteValidacija(skladiste){
    const test = Joi.object().keys({
        adresa: Joi.string().min(1).max(30).required(),
        prodavnicaID: Joi.number().min(1).required()
        })
    return test.validate(skladiste)
}

function stanjeValidacija(stanje){
    const test = Joi.object().keys({
        kolicina: Joi.number().min(1).required(),
        skladisteID: Joi.number().min(1).required(),
        proizvodID: Joi.number().min(1).required()
        })
    return test.validate(stanje)
}
function recenzijaValidacija(rezenzija){
    const test = Joi.object().keys({
        ocena: Joi.number().min(1).max(5).required(),
        opis: Joi.string().max(50).required(),
        proizvodID: Joi.number().min(1).required(),
        korisnikID: Joi.number().min(1).required()
        })
    return test.validate(rezenzija)
}

function racunValidacija(racun){
    const test = Joi.object().keys({
        ukupnaCena: Joi.number().min(1).required(),
        datum: Joi.string().required(),
        korisnikID: Joi.number().min(1).required(),
        prodavnicaID: Joi.number().min(1).required()
        })
    return test.validate(racun)
}

function stavkaValidacija(stavka){
    const test = Joi.object().keys({
        kolicina: Joi.number().min(1).required(),
        cena: Joi.number().min(1).required(),
        proizvodID: Joi.number().min(1).required(),
        racunID: Joi.number().min(1).required()
        })
    return test.validate(stavka)
}

