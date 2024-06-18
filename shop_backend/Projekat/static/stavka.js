window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajStavke();
    document.getElementById('kreirajStavku').addEventListener('click', kreirajStavku)
    document.getElementById('asurirajStavku').addEventListener('click', azurirajStavku)
    document.getElementById('obrisiStavku').addEventListener('click', obrisiStavku)
}

function ucitajStavke(){
    fetch('http://127.0.0.1:8000/admin/stavka', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(stavkas => stavkas.json())
        .then(data => {
            document.getElementsByClassName('tabela-stavki')[0].innerHTML='';
            data.forEach(stavka => addStavka(stavka));
        });
        fetch('http://127.0.0.1:8000/admin/racun', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(racuns => racuns.json())
        .then(data => {
            data.forEach(racun => addRacun(racun));
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

function kreirajStavku(){
    let kolicina = document.getElementById('stavka-nova-kolicina').value
    let cena = document.getElementById('stavka-nova-cena').value
    let racun = document.getElementById('task_stavka_nova-racun').value
    let proizvod = document.getElementById('task_stavka_nova-proizvod').value

    let stavka = {
        kolicina:kolicina,
        cena:cena,
        proizvodID:proizvod,
        racunID: racun
    }
    fetch('http://127.0.0.1:8000/admin/stavka', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(stavka)
    })
        .then(stavka => stavka.json())
        .then(stavka => {
            if (stavka.message)
                alert(stavka.message)
            else
                 addStavka(stavka)
        })
}

function azurirajStavku(){
    let stavkaID = document.getElementById('azuriraj-id').value
    let kolicina = document.getElementById('azuriraj-kolicina').value
    let cena = document.getElementById('azuriraj-cena').value
    let proizvod = document.getElementById('task_stavka_azuriraj-proizvod').value
    let racun = document.getElementById('task_stavka_azuriraj-racun').value

    
    let stavka = {
        kolicina:kolicina,
        cena:cena,
        proizvodID:proizvod,
        racunID: racun
    }

    fetch(`http://127.0.0.1:8000/admin/stavka/${stavkaID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(stavka)
    })
        .then(stavka => stavka.json())
        .then(stavka => {
            if (stavka.message)
                alert(stavka.message)
            else
                getStavka()
        })
}

function obrisiStavku(){
    let stavkaID = document.getElementById('obrisi-stavka').value;

    fetch(`http://127.0.0.1:8000/admin/stavka/${stavkaID}`, {
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
                getStavka()
        })
}

function addProizvod(proizvod){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = proizvod.id
    opcija.innerHTML = proizvod.naziv

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_stavka_nova-proizvod')
    let cBox1 = document.getElementById('task_stavka_azuriraj-proizvod')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addRacun(racun){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = racun.id
    opcija.innerHTML = racun.datum

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_stavka_nova-racun')
    let cBox1 = document.getElementById('task_stavka_azuriraj-racun')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addStavka(stavka){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.classList.add('stavka-id');
    td2.classList.add('stavka-kolicina');
    td3.classList.add('stavka-cena');
    td4.classList.add('stavka-proizvodID');
    td5.classList.add('stavka-racun');

    let text1 = document.createTextNode(`${stavka.id}`);
    let text2 = document.createTextNode(`${stavka.kolicina}`);
    let text3 = document.createTextNode(`${stavka.cena}`);
    let text4 = document.createTextNode(`${stavka.proizvodID}`);
    let text5 = document.createTextNode(`${stavka.racunID}`);


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

    let tableBody = document.getElementsByClassName('tabela-stavki')[0]
    tableBody.append(tr)
}


function getStavka(){
    fetch('http://127.0.0.1:8000/admin/stavka', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(stavkas => stavkas.json())
        .then(stavkas => {
            document.getElementsByClassName('tabela-stavki')[0].innerHTML = ''
            stavkas.forEach(stavka => addStavka(stavka))
        })
}