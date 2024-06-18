window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajSkladista();
    document.getElementById('kreirajSkladiste').addEventListener('click', kreirajSkladiste)
    document.getElementById('azurirajSkladiste').addEventListener('click', azurirajSkladiste)
    document.getElementById('obrisiSkladiste').addEventListener('click', obrisiSkladiste)
}

function ucitajSkladista(){
    fetch('http://127.0.0.1:8000/admin/skladiste', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(skladistas => skladistas.json())
        .then(data => {
            document.getElementsByClassName('tabela-skladista')[0].innerHTML='';
            data.forEach(skladiste => addSkladiste(skladiste));
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

function kreirajSkladiste(){
    let adresa = document.getElementById('skladiste-nova-adresa').value
    let prodavnicaID = document.getElementById('task_skladiste_nova').value

    let skladiste = {
        adresa: adresa,
        prodavnicaID: prodavnicaID
    }
    fetch('http://127.0.0.1:8000/admin/skladiste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(skladiste)
    })
        .then(skladiste => skladiste.json())
        .then(skladiste => {
            if (skladiste.message)
                alert(skladiste.message)
            else
                 addSkladiste(skladiste)
        })
}

function azurirajSkladiste(){
    let skladisteID = document.getElementById('azuriraj-id').value
    let adresa = document.getElementById('azuriraj-adresa').value
    let prodavnicaID = document.getElementById('task_skladiste_azuriraj').value

    let skladiste = {
        adresa: adresa,
        prodavnicaID: prodavnicaID
    }

    fetch(`http://127.0.0.1:8000/admin/skladiste/${skladisteID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(skladiste)
    })
        .then(skladiste => skladiste.json())
        .then(skladiste => {
            if (skladiste.message)
                alert(skladiste.message)
            else
                getSkladiste()
        })
}

function obrisiSkladiste(){
    let skladisteID = document.getElementById('obrisi-skladiste').value;

    fetch(`http://127.0.0.1:8000/admin/skladiste/${skladisteID}`, {
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
                getSkladiste()
        })
}

function addProdavnica(prodavnica){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = prodavnica.id
    opcija.innerHTML = prodavnica.ime

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_skladiste_nova')
    let cBox1 = document.getElementById('task_skladiste_azuriraj')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addSkladiste(skladiste){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    td1.classList.add('skladiste-id');
    td2.classList.add('skladiste-adresa');
    td3.classList.add('skladiste-prodavnicaID');


    let text1 = document.createTextNode(`${skladiste.id}`);
    let text2 = document.createTextNode(`${skladiste.adresa}`);
    let text3 = document.createTextNode(`${skladiste.prodavnicaID}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)


    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)


    let tableBody = document.getElementsByClassName('tabela-skladista')[0]
    tableBody.append(tr)
}


function getSkladiste(){
    fetch('http://127.0.0.1:8000/admin/skladiste', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(skladistas => skladistas.json())
        .then(skladistas => {
            document.getElementsByClassName('tabela-skladista')[0].innerHTML = ''
            skladistas.forEach(skladiste => addSkladiste(skladiste))
        })
}