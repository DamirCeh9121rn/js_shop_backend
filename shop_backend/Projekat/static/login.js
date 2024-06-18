window.addEventListener('load', init);

function init(){
    document.getElementById('signup').addEventListener('click', singUp);
    document.getElementById('login').addEventListener('click', login);
}

function singUp(){
    let korisnik = {
        ime: document.getElementById('ime').value,
        prezime: document.getElementById('prezime').value,
        sifra: document.getElementById('sifra').value,
        email: document.getElementById('email').value,
        tip: document.getElementById('tip').value
    }

    console.log(korisnik)
    fetch('http://127.0.0.1:8002/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(korisnik)
    })
        .then(res => res.json())
        .then(resKorisnik => {
            if (resKorisnik.message)
                alert(resKorisnik.message)
            else if (resKorisnik.user)
                alert('Successfully registered. You can Login now')
        })
}

function login() {
    let korisnik = {
        email: document.getElementById('email-login').value,
        sifra: document.getElementById('sifra-login').value,
    }

    fetch('http://127.0.0.1:8002/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(korisnik)
    })
        .then(res => res.json())
            .then(resKorisnik => {
                if (resKorisnik.message)
                    alert(resKorisnik.message)
                else if (resKorisnik.token) {
                    document.cookie = `token=${resKorisnik.token};SameSite=Lax`
                    window.location.href = 'home.html'
                }
            })
}