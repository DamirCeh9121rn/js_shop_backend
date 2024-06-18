window.addEventListener("load", start);

const cookies = document.cookie.split('=')
const token = cookies[cookies.length - 1]

function start(){
    ucitajGradove();
    document.getElementById('kreirajGrad').addEventListener('click', kreirajGrad)
    document.getElementById('azurirajGrad').addEventListener('click', azurirajGrad)
    document.getElementById('obrisiGrad').addEventListener('click', obrisiGrad)
}

function ucitajGradove(){
    fetch('http://127.0.0.1:8000/admin/grad', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
        .then(grads => grads.json())
        .then(data => {
            document.getElementsByClassName('tabela-gradova')[0].innerHTML='';
            data.forEach(grad => addGrad(grad));
        });
}

function kreirajGrad(){
    let imeGrada = document.getElementById('ime-novo').value
    let grad = {
        ime: imeGrada
    }
    console.log(grad)
    fetch('http://127.0.0.1:8000/admin/grad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
         },
        body: JSON.stringify(grad)
    })
        .then(grad => grad.json())
        .then(grad => {
            if (grad.message)
                alert(grad.message)
            else
                addGrad(grad)
        })
}

function azurirajGrad(){
    let gradID = document.getElementById('azuriraj-id').value
    let imeGrada = document.getElementById('azuriraj-ime').value

    let grad = {
        ime:imeGrada
    }

    fetch(`http://127.0.0.1:8000/admin/grad/${gradID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(grad)
    })
        .then(grad => grad.json())
        .then(grad => {
            if (grad.message)
                alert(grad.message)
            else
                getGrad()
        })
}

function obrisiGrad(){
    let gradID = document.getElementById('obrisi-grad-div').value;

    fetch(`http://127.0.0.1:8000/admin/grad/${gradID}`, {
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
                getGrad()
        })
}


function addGrad(grad){
    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.classList.add('grad-id');
    td2.classList.add('grad-ime');


    let text1 = document.createTextNode(`${grad.id}`);
    let text2 = document.createTextNode(`${grad.ime}`);

    td1.appendChild(text1)
    td2.appendChild(text2)


    tr.appendChild(td1)
    tr.appendChild(td2)
 
    let tableBody = document.getElementsByClassName('tabela-gradova')[0]
    tableBody.append(tr)
}


function getGrad(){
    fetch('http://localhost:8000/admin/grad', {
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
    })
        .then(grads => grads.json())
        .then(grads => {
            document.getElementsByClassName('tabela-gradova')[0].innerHTML = ''
            grads.forEach(grad => addGrad(grad))
        })
}