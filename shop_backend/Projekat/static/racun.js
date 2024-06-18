window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajRacune();
    document.getElementById('kreirajRacun').addEventListener('click', kreirajRacun)
    document.getElementById('azurirajRacun').addEventListener('click', azurirajRacun)
    document.getElementById('obrisiRacun').addEventListener('click', obrisiRacun)
}

function ucitajRacune(){
    fetch('http://127.0.0.1:8000/admin/racun', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(racuns => racuns.json())
        .then(data => {
            document.getElementsByClassName('tabela-racuna')[0].innerHTML='';
            data.forEach(racun => addRacun(racun));
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
        fetch('http://127.0.0.1:8000/admin/prodavnica', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(prodavnicas => prodavnicas.json())
        .then(data => {
            data.forEach(prodavnica => addProdavnica(prodavnica));
        });
}

function kreirajRacun(){
    let cena = document.getElementById('racun-nova-cena').value
    let datum = document.getElementById('racun-nova-datum').value
    let korisnik = document.getElementById('task_racun_nova-korisnik').value
    let prodavnica = document.getElementById('task_racun_nova-prodavnica').value

    let racun = {
        ukupnaCena:cena,
        datum:datum,
        korisnikID:korisnik,
        prodavnicaID: prodavnica
    }
    fetch('http://127.0.0.1:8000/admin/racun', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(racun)
    })
        .then(racun => racun.json())
        .then(racun => {
            if (racun.message)
                alert(racun.message)
            else
                 addRacun(racun)
        })
}

function azurirajRacun(){
    let racunID = document.getElementById('azuriraj-id').value
    let cena = document.getElementById('azuriraj-cena').value
    let datum = document.getElementById('azuriraj-datum').value
    let korisnik = document.getElementById('task_racun_azuriraj-korisnik').value
    let prodavnica = document.getElementById('task_racun_azuriraj-prodavnica').value

    let racun = {
        ukupnaCena:cena,
        datum:datum,
        korisnikID:korisnik,
        prodavnicaID: prodavnica
    }

    fetch(`http://127.0.0.1:8000/admin/racun/${racunID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(racun)
    })
        .then(racun => racun.json())
        .then(racun => {
            if (racun.message)
                alert(racun.message)
            else
                getRacun()
        })
}

function obrisiRacun(){
    let racunID = document.getElementById('obrisi-racun').value;

    fetch(`http://127.0.0.1:8000/admin/racun/${racunID}`, {
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
                getRacun()
        })
}

function addProdavnica(prodavnica){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = prodavnica.id
    opcija.innerHTML = prodavnica.ime

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_racun_nova-prodavnica')
    let cBox1 = document.getElementById('task_racun_azuriraj-prodavnica')
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
    let cBox = document.getElementById('task_racun_nova-korisnik')
    let cBox1 = document.getElementById('task_racun_azuriraj-korisnik')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addRacun(racun){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.classList.add('racun-id');
    td2.classList.add('racun-ukupnaCena');
    td3.classList.add('racun-datum');
    td2.classList.add('racun-korisnik');
    td3.classList.add('racun-prodavnica');


    let text1 = document.createTextNode(`${racun.id}`);
    let text2 = document.createTextNode(`${racun.ukupnaCena}`);
    let text3 = document.createTextNode(`${racun.datum}`);
    let text4 = document.createTextNode(`${racun.korisnikID}`);
    let text5 = document.createTextNode(`${racun.prodavnicaID}`);

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

    let tableBody = document.getElementsByClassName('tabela-racuna')[0]
    tableBody.append(tr)
}


function getRacun(){
    fetch('http://127.0.0.1:8000/admin/racun', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(racuns => racuns.json())
        .then(racuns => {
            document.getElementsByClassName('tabela-racuna')[0].innerHTML = ''
            racuns.forEach(racun => addRacun(racun))
        })
}