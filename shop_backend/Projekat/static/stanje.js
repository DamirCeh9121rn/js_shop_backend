window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajStanja();
    document.getElementById('kreirajStanje').addEventListener('click', kreirajStanje)
    document.getElementById('azurirajStanje').addEventListener('click', azurirajStanje)
    document.getElementById('obrisiStanje').addEventListener('click', obrisiStanje)
}

function ucitajStanja(){
    fetch('http://127.0.0.1:8000/admin/stanje')
        .then(stanjes => stanjes.json())
        .then(data => {
            document.getElementsByClassName('tabela-stanja')[0].innerHTML='';
            data.forEach(stanje => addStanje(stanje));
        });
        fetch('http://127.0.0.1:8000/admin/skladiste', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(skladistes => skladistes.json())
        .then(data => {
            data.forEach(skladiste => addSkladiste(skladiste));
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

function kreirajStanje(){
    let kolicina = document.getElementById('stanja-nova-kolicina').value
    let skladiste = document.getElementById('task_stanja_nova-skladiste').value
    let proizvod = document.getElementById('task_stanja_nova-proizvod').value

    let stanje = {
        kolicina:kolicina,
        skladisteID:skladiste,
        proizvodID: proizvod
    }
    fetch('http://127.0.0.1:8000/admin/stanje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(stanje)
    })
        .then(stanje => stanje.json())
        .then(stanje => {
            if (stanje.message)
                alert(stanje.message)
            else
                 addStanje(stanje)
        })
}

function azurirajStanje(){
    let stanjeID = document.getElementById('azuriraj-id').value
    let kolicina = document.getElementById('azuriraj-kolicina').value
    let skladiste = document.getElementById('task_stanja_azuriraj-skladiste').value
    let proizvod = document.getElementById('task_stanja_azuriraj-proizvod').value

    
    let stanje = {
        kolicina:kolicina,
        skladisteID:skladiste,
        proizvodID: proizvod
    }

    fetch(`http://127.0.0.1:8000/admin/stanje/${stanjeID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(stanje)
    })
        .then(stanje => stanje.json())
        .then(stanje => {
            if (stanje.message)
                alert(stanje.message)
            else
                getStanje()
        })
}

function obrisiStanje(){
    let stanjeID = document.getElementById('obrisi-stanje').value;

    fetch(`http://127.0.0.1:8000/admin/stanje/${stanjeID}`, {
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
                getStanje()
        })
}

function addProizvod(proizvod){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = proizvod.id
    opcija.innerHTML = proizvod.naziv

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_stanja_nova-proizvod')
    let cBox1 = document.getElementById('task_stanja_azuriraj-proizvod')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addSkladiste(skladiste){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = skladiste.id
    opcija.innerHTML = skladiste.adresa

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_stanja_nova-skladiste')
    let cBox1 = document.getElementById('task_stanja_azuriraj-skladiste')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addStanje(stanje){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');


    td1.classList.add('stanje-id');
    td2.classList.add('stanje-ocena');
    td3.classList.add('stanje-opis');
    td4.classList.add('stanje-korisnik');


    let text1 = document.createTextNode(`${stanje.id}`);
    let text2 = document.createTextNode(`${stanje.kolicina}`);
    let text3 = document.createTextNode(`${stanje.skladisteID}`);
    let text4 = document.createTextNode(`${stanje.proizvodID}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)

    let tableBody = document.getElementsByClassName('tabela-stanja')[0]
    tableBody.append(tr)
}


function getStanje(){
    fetch('http://127.0.0.1:8000/admin/stanje', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(stanjes => stanjes.json())
        .then(stanjes => {
            document.getElementsByClassName('tabela-stanja')[0].innerHTML = ''
            stanjes.forEach(stanje => addStanje(stanje))
        })
}