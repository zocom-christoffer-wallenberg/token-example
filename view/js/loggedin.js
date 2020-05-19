const buttonElem = document.querySelector('#logout');

function getToken() {
    return sessionStorage.getItem('auth');
}

async function isLoggedIn() {
    const token = getToken();
    const url = 'http://localhost:8000/api/auth/isloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();

    if (!data.isLoggedIn) {
        location.href = '/';
    }
}

function logout() {
    sessionStorage.removeItem('auth');
    location.href = '/';
}

buttonElem.addEventListener('click', () => {
    logout();
});

isLoggedIn();