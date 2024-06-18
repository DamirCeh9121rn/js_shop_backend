window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajKategorije();
    document.getElementById('kreirajKategoriju').addEventListener('click', kreirajKategoriju)
    document.getElementById('azurirajKategoriju').addEventListener('click', azurirajKategoriju)
    document.getElementById('obrisiKategoriju').addEventListener('click', obrisiKategoriju)
}

function ucitajKategorije(){
    fetch('http://127.0.0.1:8000/admin/kategorija', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(kategorijas => kategorijas.json())
        .then(data => {
            document.getElementsByClassName('tabela-kategorija')[0].innerHTML='';
            data.forEach(kategorija => addKategorija(kategorija));
        });
}

function kreirajKategoriju(){
    let naziv = document.getElementById('kategorija-nova').value
    let kategorija = {
        naziv: naziv
    }
    console.log(kategorija)
    fetch('http://127.0.0.1:8000/admin/kategorija', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(kategorija)
    })
        .then(kategorija => kategorija.json())
        .then(kategorija => {
            if (kategorija.message)
                alert(kategorija.message)
            else
                 addKategorija(kategorija)
        })
}

function azurirajKategoriju(){
    let kategorijaID = document.getElementById('azuriraj-id').value
    let naziv = document.getElementById('azuriraj-naziv').value

    let kategorija = {
        naziv:naziv
    }

    fetch(`http://127.0.0.1:8000/admin/kategorija/${kategorijaID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(kategorija)
    })
        .then(kategorija => kategorija.json())
        .then(kategorija => {
            if (kategorija.message)
                alert(kategorija.message)
            else
                getKategorija()
        })
}

function obrisiKategoriju(){
    let kategorijaID = document.getElementById('obrisi-kategoriju-div').value;

    fetch(`http://127.0.0.1:8000/admin/kategorija/${kategorijaID}`, {
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
                getKategorija()
        })
}


function addKategorija(kategorija){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.classList.add('kategorija-id');
    td2.classList.add('kategorija-naziv');


    let text1 = document.createTextNode(`${kategorija.id}`);
    let text2 = document.createTextNode(`${kategorija.naziv}`);

    td1.appendChild(text1)
    td2.appendChild(text2)


    tr.appendChild(td1)
    tr.appendChild(td2)
 
    let tableBody = document.getElementsByClassName('tabela-kategorija')[0]
    tableBody.append(tr)
}


function getKategorija(){
    fetch('http://127.0.0.1:8000/admin/kategorija', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(kategorijas => kategorijas.json())
        .then(kategorijas => {
            document.getElementsByClassName('tabela-kategorija')[0].innerHTML = ''
            kategorijas.forEach(kategorija => addKategorija(kategorija))
        })
}