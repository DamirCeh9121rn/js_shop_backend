window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    uvcitajProizvode();
    document.getElementById('kreirajProizvod').addEventListener('click', kreirajProizvod)
    document.getElementById('azurirajProizvod').addEventListener('click', azurirajProizvod)
    document.getElementById('obrisiProizvod').addEventListener('click', obrisiProizvod)
}

function uvcitajProizvode(){
    fetch('http://127.0.0.1:8000/admin/proizvod', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(proizvods => proizvods.json())
        .then(data => {
            document.getElementsByClassName('tabela-prizvodi')[0].innerHTML='';
            data.forEach(proizvod => addProizvod(proizvod));
        });
        fetch('http://127.0.0.1:8000/admin/kategorija', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(kategorijas => kategorijas.json())
        .then(data => {
            data.forEach(kategorija => addKategorija(kategorija));
        });
}

function kreirajProizvod(){
    let naziv = document.getElementById('proizvod-nova-naziv').value
    let cena = document.getElementById('proizvod-nova-cena').value
    let kategorijaID = document.getElementById('task_proizvod_nova').value

    let prizvod = {
        naziv: naziv,
        cena: cena,
        kategorijaID: kategorijaID
    }
    fetch('http://127.0.0.1:8000/admin/proizvod', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(prizvod)
    })
        .then(prizvod => prizvod.json())
        .then(prizvod => {
            if (prizvod.message)
                alert(prizvod.message)
            else
                 addProizvod(prizvod)
        })
}

function azurirajProizvod(){
    let proizvodID = document.getElementById('azuriraj-id').value
    let naziv = document.getElementById('azuriraj-naziv').value
    let cena = document.getElementById('azuriraj-cenu').value
    let kategorijaID = document.getElementById('task_proizvod_azuriraj').value

    let proizvod = {
        naziv: naziv,
        cena: cena,
        kategorijaID: kategorijaID
    }

    fetch(`http://127.0.0.1:8000/admin/proizvod/${proizvodID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(proizvod)
    })
        .then(proizvod => proizvod.json())
        .then(proizvod => {
            if (proizvod.message)
                alert(proizvod.message)
            else
                getProizvod()
        })
}

function obrisiProizvod(){
    let proizvodID = document.getElementById('obrisi-proizvod').value;

    fetch(`http://127.0.0.1:8000/admin/proizvod/${proizvodID}`, {
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
                getProizvod()
        })
}

function addKategorija(kategorija){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = kategorija.id
    opcija.innerHTML = kategorija.naziv

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_proizvod_nova')
    let cBox1 = document.getElementById('task_proizvod_azuriraj')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addProizvod(proizvod){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    td1.classList.add('proizvod-id');
    td2.classList.add('proizvod-naziv');
    td3.classList.add('proizvod-cena');
    td4.classList.add('proizvod-kategorijaID');

    let text1 = document.createTextNode(`${proizvod.id}`);
    let text2 = document.createTextNode(`${proizvod.naziv}`);
    let text3 = document.createTextNode(`${proizvod.cena}`);
    let text4 = document.createTextNode(`${proizvod.kategorijaID}`);
    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)
    td4.appendChild(text4)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)

    let tableBody = document.getElementsByClassName('tabela-prizvodi')[0]
    tableBody.append(tr)
}


function getProizvod(){
    fetch('http://127.0.0.1:8000/admin/proizvod', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(proizvods => proizvods.json())
        .then(proizvods => {
            document.getElementsByClassName('tabela-prizvodi')[0].innerHTML = ''
            proizvods.forEach(proizvod => addProizvod(proizvod))
        })
}