const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#pass');
const lengthElem = document.querySelector('#length');
const lowercaseElem = document.querySelector('#lowercase');
const uppercaseElem = document.querySelector('#uppercase');
const numberElem = document.querySelector('#number');
const specialCharacterElem = document.querySelector('#specialCharacter');


function saveToken(token) {
    sessionStorage.setItem('auth', token);
}

async function createAccount(username, password) {
    const url = 'http://localhost:8000/api/create';
    const body = {
        username: username,
        password: password
    }

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(body), 
        headers: { 'Content-Type': 'application/json' }});
    const data = await response.json();

    if (data.success) {
        location.href = 'http://localhost:8000/loggedin.html';
        saveToken(data.token);
    }
}

function checkValidation(validation) {
    if (validation.length 
        && validation.lowercase
        && validation.uppercase
        && validation.number
        && validation.specialCharacter) {
            return true;
    } else {
        return false;
    }
} 

function validate(password) {
    console.log('Password to validate: ', password);
    console.log('-------------------------');
    let validation = {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialCharacter: false
    }

    /*
      Vi testar varje regel för sig för att öka läsbarheten och kunna
      ge feedback till användaren om den inte uppfyller alla krav och berätta vilket krav som saknas.
    */

    if (password.length >= 8) {
        console.log('Has length of at least 8 characters');
        validation.length = true;
        lengthElem.innerHTML = 'Längd: check!';
    }

    let lowercaseRegex = /[a-z]/;
    if (password.match(lowercaseRegex)) {
        console.log('Has lowercase!');
        validation.lowercase = true;
        lowercaseElem.innerHTML = 'Lowercase: check!';
    }

    let uppercaseRegex = /[A-Z]/
    if (password.match(uppercaseRegex)) {
        console.log('Has uppercase!');
        validation.uppercase = true;
        uppercaseElem.innerHTML = 'Uppercase: check!';
    }

    let numberRegex = /[0-9]/
    if (password.match(numberRegex)) {
        console.log('Has number');
        validation.number = true;
        numberElem.innerHTML = 'Number: check!';
    }

    let specialCharacter = /\W/
    if (password.match(specialCharacter)) {
        console.log('Has special character!');
        validation.specialCharacter = true;
        specialCharacterElem.innerHTML = 'Special character: check!';
    }

    //Vi testar av hela regex på en rad istället. Nackdelen är att vi inte vet vilken regel som inte uppfyllts
    //om det skulle vara fallet

    /*let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    console.log(password.match(regex));
    if (password.match(regex)) {
        console.log('Validation is a match!');
    } else {
        console.log('No match');
    }*/

    return validation;
}

inputPass.addEventListener('keyup', () => {
    validate(inputPass.value);
});

buttonElem.addEventListener('click', () => {
    const username = inputUser.value;
    const password = inputPass.value;

    let passwordValidated = validate(password);
    console.log(passwordValidated);

    if (checkValidation(passwordValidated)) {  //Om lösenord uppnär alla lösenordsregler så skapa konto
        createAccount(username, password);
    }
});