window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajKorisnike();
    document.getElementById('kreirajKorisnika').addEventListener('click', kreirajKorisnika)
    document.getElementById('azurirajKorisnika').addEventListener('click', azurirajKorisnika)
    document.getElementById('obrisiKorisnika').addEventListener('click', obrisiKorisnika)
}

function ucitajKorisnike(){
    fetch('http://127.0.0.1:8000/admin/korisnik', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(korisniks => korisniks.json())
        .then(data => {
            document.getElementsByClassName('tabela-korisnici')[0].innerHTML='';
            data.forEach(korisnik => addKorisnik(korisnik));
        });
}

function kreirajKorisnika(){
    let ime = document.getElementById('korisnik-novi-ime').value
    let prezime = document.getElementById('korisnik-novi-prezime').value
    let email = document.getElementById('korisnik-novi-email').value
    let sifra = document.getElementById('korisnik-novi-sifra').value
    let tip = document.getElementById('korisnik-novi-tip').value

    let korisnik = {
        ime: ime,
        prezime: prezime,
        email: email,
        sifra: sifra,
        tip: tip
    }
    fetch('http://127.0.0.1:8000/admin/korisnik', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(korisnik)
    })
        .then(korisnik => korisnik.json())
        .then(korisnik => {
            if (korisnik.message)
                alert(korisnik.message)
            else
                 addKorisnik(korisnik)
        })
}

function azurirajKorisnika(){
    let korisnikID = document.getElementById('azuriraj-id').value
    let ime = document.getElementById('azuriraj-ime').value
    let prezime = document.getElementById('azuriraj-prezime').value
    let email = document.getElementById('azuriraj-email').value
    let sifra = document.getElementById('azuriraj-sifra').value
    let tip = document.getElementById('azuriraj-tip').value

    let korisnik = {
        ime: ime,
        prezime: prezime,
        email: email,
        sifra: sifra,
        tip: tip
    }

    fetch(`http://127.0.0.1:8000/admin/korisnik/${korisnikID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(korisnik)
    })
        .then(korisnik => korisnik.json())
        .then(korisnik => {
            if (korisnik.message)
                alert(korisnik.message)
            else
                getKorisnik()
        })
}

function obrisiKorisnika(){
    let korisnikID = document.getElementById('obrisi-korisnika').value;

    fetch(`http://127.0.0.1:8000/admin/korisnik/${korisnikID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(res => res.json())
        .then(res => {
            if (res.message)
                alert(res.message)
            else
                getKorisnik()
        })
}


function addKorisnik(korisnik){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');

    td1.classList.add('korisnik-id');
    td2.classList.add('korisnik-ime');
    td1.classList.add('korisnik-prezime');
    td2.classList.add('korisnik-email');
    td1.classList.add('korisnik-sifra');
    td2.classList.add('korisnik-tip');

    let text1 = document.createTextNode(`${korisnik.id}`);
    let text2 = document.createTextNode(`${korisnik.ime}`);
    let text3 = document.createTextNode(`${korisnik.prezime}`);
    let text4 = document.createTextNode(`${korisnik.email}`);
    let text5 = document.createTextNode(`${korisnik.sifra}`);
    let text6 = document.createTextNode(`${korisnik.tip}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)
    td5.appendChild(text5)
    td6.appendChild(text6)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
 
    let tableBody = document.getElementsByClassName('tabela-korisnici')[0]
    tableBody.append(tr)
}


function getKorisnik(){
    fetch('http://127.0.0.1:8000/admin/korisnik', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(korisniks => korisniks.json())
        .then(korisniks => {
            document.getElementsByClassName('tabela-korisnici')[0].innerHTML = ''
            korisniks.forEach(korisnik => addKorisnik(korisnik))
        })
}