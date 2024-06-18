window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajRecenzije();
    document.getElementById('kreirajRecenziju').addEventListener('click', kreirajRecenziju)
    document.getElementById('azurirajRecenziju').addEventListener('click', azurirajRecenziju)
    document.getElementById('obrisiRecenziju').addEventListener('click', obirsiRecenziju)
}

function ucitajRecenzije(){
    fetch('http://127.0.0.1:8000/admin/recenzija', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(recenzijas => recenzijas.json())
        .then(data => {
            document.getElementsByClassName('tabela-recenzija')[0].innerHTML='';
            data.forEach(recenzija => addRecenzija(recenzija));
        });
        fetch('http://127.0.0.1:8000/admin/korisnik', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(korisniks => korisniks.json())
        .then(data => {
            data.forEach(korisnik => addKorisnik(korisnik));
        });
        fetch('http://127.0.0.1:8000/admin/proizvod', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(proizvods => proizvods.json())
        .then(data => {
            data.forEach(proizvod => addProizvod(proizvod));
        });
}

function kreirajRecenziju(){
    let ocena = document.getElementById('recenzija-nova-ocena').value
    let opis = document.getElementById('recenzija-nova-opis').value
    let proizvod = document.getElementById('task_recenzija_nova-proizvod').value
    let korisnik = document.getElementById('task_recenzija_nova-korisnik').value

    let recenzija = {
        ocena:ocena,
        opis:opis,
        proizvodID:proizvod,
        korisnikID: korisnik
    }
    fetch('http://127.0.0.1:8000/admin/recenzija', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(recenzija)
    })
        .then(recenzija => recenzija.json())
        .then(recenzija => {
            if (recenzija.message)
                alert(recenzija.message)
            else
                 addRecenzija(recenzija)
        })
}

function azurirajRecenziju(){
    let recenzijaID = document.getElementById('azuriraj-id').value
    let ocena = document.getElementById('azuriraj-ocena').value
    let opis = document.getElementById('azuriraj-opis').value
    let proizvod = document.getElementById('task_recenzija_azuriraj-proizvod').value
    let korisnik = document.getElementById('task_recenzija_azuriraj-korisnik').value

    
    let recenzija = {
        ocena:ocena,
        opis:opis,
        proizvodID:proizvod,
        korisnikID: korisnik
    }

    fetch(`http://127.0.0.1:8000/admin/recenzija/${recenzijaID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(recenzija)
    })
        .then(recenzija => recenzija.json())
        .then(recenzija => {
            if (recenzija.message)
                alert(recenzija.message)
            else
                getRecenzija()
        })
}

function obirsiRecenziju(){
    let recenzijaID = document.getElementById('obrisi-recenziju').value;

    fetch(`http://127.0.0.1:8000/admin/recenzija/${recenzijaID}`, {
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
                getRecenzija()
        })
}

function addProizvod(proizvod){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = proizvod.id
    opcija.innerHTML = proizvod.naziv

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_recenzija_nova-proizvod')
    let cBox1 = document.getElementById('task_recenzija_azuriraj-proizvod')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addKorisnik(korisnik){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = korisnik.id
    opcija.innerHTML = korisnik.ime

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_recenzija_nova-korisnik')
    let cBox1 = document.getElementById('task_recenzija_azuriraj-korisnik')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addRecenzija(recenzija){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.classList.add('recenzija-id');
    td2.classList.add('recenzija-ocena');
    td3.classList.add('recenzija-opis');
    td4.classList.add('recenzija-proizvodID');
    td5.classList.add('recenzija-korisnikID');


    let text1 = document.createTextNode(`${recenzija.id}`);
    let text2 = document.createTextNode(`${recenzija.ocena}`);
    let text3 = document.createTextNode(`${recenzija.opis}`);
    let text4 = document.createTextNode(`${recenzija.proizvodID}`);
    let text5 = document.createTextNode(`${recenzija.korisnikID}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)
    td5.appendChild(text5)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)

    let tableBody = document.getElementsByClassName('tabela-recenzija')[0]
    tableBody.append(tr)
}


function getRecenzija(){
    fetch('http://127.0.0.1:8000/admin/recenzija', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(recenzijas => recenzijas.json())
        .then(recenzijas => {
            document.getElementsByClassName('tabela-recenzija')[0].innerHTML = ''
            recenzijas.forEach(recenzija => addRecenzija(recenzija))
        })
}