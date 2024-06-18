window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajProdavnice();
    document.getElementById('kreirajProdavnicu').addEventListener('click', kreirajProdavnicu)
    document.getElementById('azurirajProdavnicu').addEventListener('click', azurirajProdavnicu)
    document.getElementById('obrisiProdavnicu').addEventListener('click', obrisiProdavnicu)
}

function ucitajProdavnice(){
    fetch('http://127.0.0.1:8000/admin/prodavnica', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(prodavnicas => prodavnicas.json())
        .then(data => {
            document.getElementsByClassName('tabela-prodavnice')[0].innerHTML='';
            data.forEach(prodavnica => addProdavnica(prodavnica));
        });
        fetch('http://127.0.0.1:8000/admin/grad', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(grads => grads.json())
        .then(data => {
            data.forEach(grad => addGrad(grad));
        });
}

function kreirajProdavnicu(){
    let ime = document.getElementById('prodavnica-nova-ime').value
    let gradID = document.getElementById('task_prodavnica_grad_nova').value

    console.log(document.getElementById('task_prodavnica_grad_nova').value)
    let prodavnica = {
        ime: ime,
        gradID: gradID
    }
    console.log(prodavnica)
    fetch('http://127.0.0.1:8000/admin/prodavnica', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(prodavnica)
    })
        .then(prodavnica => prodavnica.json())
        .then(prodavnica => {
            if (prodavnica.message)
                alert(prodavnica.message)
            else
                 addProdavnica(prodavnica)
        })
}

function azurirajProdavnicu(){
    let prodavnicaID = document.getElementById('azuriraj-id').value
    let ime = document.getElementById('azuriraj-ime').value
    let gradID = document.getElementById('task_prodavnica_grad_azuriraj').value

    let prodavnica = {
        ime: ime,
        gradID: gradID
    }

    fetch(`http://127.0.0.1:8000/admin/prodavnica/${prodavnicaID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(prodavnica)
    })
        .then(prodavnica => prodavnica.json())
        .then(prodavnica => {
            if (prodavnica.message)
                alert(prodavnica.message)
            else
                getProdavnica()
        })
}

function obrisiProdavnicu(){
    let prodavnicaID = document.getElementById('obrisi-prodavnicu').value;

    fetch(`http://127.0.0.1:8000/admin/prodavnica/${prodavnicaID}`, {
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
                getProdavnica()
        })
}

function addGrad(grad){
    let opcija = document.createElement('option');
    let opcija1 = document.createElement('option');
    
    opcija.value = grad.id
    opcija.innerHTML = grad.ime

    opcija1.value = opcija.value
    opcija1.innerHTML = opcija.innerHTML
    let cBox = document.getElementById('task_prodavnica_grad_nova')
    let cBox1 = document.getElementById('task_prodavnica_grad_azuriraj')
    cBox.appendChild(opcija)
    cBox1.appendChild(opcija1)
}

function addProdavnica(prodavnica){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.classList.add('prodavnica-id');
    td2.classList.add('prodavnica-ime');
    td3.classList.add('prodavnica-gradID');

    let text1 = document.createTextNode(`${prodavnica.id}`);
    let text2 = document.createTextNode(`${prodavnica.ime}`);
    let text3 = document.createTextNode(`${prodavnica.gradID}`);

    td1.appendChild(text1)
    td2.appendChild(text2)
    td3.appendChild(text3)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    let tableBody = document.getElementsByClassName('tabela-prodavnice')[0]
    tableBody.append(tr)
}


function getProdavnica(){
    fetch('http://127.0.0.1:8000/admin/prodavnica', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(prodavnicas => prodavnicas.json())
        .then(prodavnicas => {
            document.getElementsByClassName('tabela-prodavnice')[0].innerHTML = ''
            prodavnicas.forEach(prodavnica => addProdavnica(prodavnica))
        })
}