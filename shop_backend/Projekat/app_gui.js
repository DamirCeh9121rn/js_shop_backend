const express = require('express')
const path = require('path')
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
app.use(express.static(path.join(__dirname, 'static')));


function getCookies(req) {
    if (req.headers.cookie == null)
        return {}

    const rawCookies = req.headers.cookie.split('; ')
    const parsedCookies = {}

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=')
        parsedCookies[parsedCookie[0]] = parsedCookie[1]
    })

    return parsedCookies
}

function authToken(req, res, next) {
    const cookies = getCookies(req)
    const token = cookies['token']

    if (token == null)
        return res.redirect(301, '/login')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, korisnik) => {
        if (err)
            return res.redirect(301, '/login')
        req.korisnik = korisnik
        next()
    })
}



let corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.get('/login', authToken, (req, res) => {
    res.sendFile('login.html', { root: './static' })
})

app.get('/', (req, res) => {
    res.sendFile('home.html', { root: 'static' })
});

app.get('/grad', authToken, (req, res) => {
    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
        res.sendFile('grad.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/kategorija', authToken, (req, res) => {
   // res.sendFile('kategorija.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
        res.sendFile('kategorija.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/korisnik', authToken, (req, res) => {
   // res.sendFile('korisnik.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
    res.sendFile('korisnik.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});
app.get('/prodavnica', authToken, (req, res) => {
   // res.sendFile('prodavnica.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
         res.sendFile('prodavnica.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/proizvod', authToken, (req, res) => {
    //res.sendFile('proizvod.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
    res.sendFile('proizvod.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/racun', authToken, (req, res) => {
   // res.sendFile('racun.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
          res.sendFile('racun.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/recenzija', authToken, (req, res) => {
   // res.sendFile('recenzija.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
         res.sendFile('recenzija.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});
app.get('/skladiste', authToken, (req, res) => {
   // res.sendFile('skladiste.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
         res.sendFile('skladiste.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/stanje', authToken, (req, res) => {
    //res.sendFile('stanje.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
         res.sendFile('stanje.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});

app.get('/stavka', authToken, (req, res) => {
    //res.sendFile('stavka.html', { root: 'static' })

    if(req.korisnik.tip === "ADMIN" || req.korisnik.tip === "MODERATOR")
             res.sendFile('stavka.html', { root: 'static' })
    else
        res.status(401).send('Not authorized')
});


app.listen({ port: 8001 }, async () => {
    console.log('Started server on localhost:8001')
})