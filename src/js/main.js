const form = document.querySelector('.form');

const cpf = document.querySelector('#cpf');

const display = document.querySelector('.result');

form.addEventListener('submit', e => {
    e.preventDefault();

    if(isValid(cpf.value)) {
        display.classList.remove('msg-error');
        display.classList.add('msg-success', 'msg');
        display.innerHTML = 'Seu CPF é VALIDO!';
    } else {
        display.classList.remove('msg-success');
        display.classList.add('msg-error', 'msg');
        display.innerHTML = 'Seu CPF é INVÁLIDO!';
    }
});

function calculateDigit(valor) {
    const cpfArray = Array.from(valor); 

    const decrement = cpfArray.length + 1;

    let adder = 0;
    
    for(let i = 0; i < cpfArray.length; i++) {
       adder += (Number(cpfArray[i]) * (decrement - i));
    }
    
    let digit = (adder * 10) % 11;

    if (digit === 10 || digit === 11) digit = 0;

    return digit;
}

function isCPFValid(valor) {
    const cpfLess = valor.slice(0, -2)

    const firstDigit = calculateDigit(cpfLess);
    let cpfVerify =cpfLess + firstDigit;

    const secondDigit = calculateDigit(cpfVerify);
    cpfVerify = cpfVerify + secondDigit;

    if(cpfVerify === valor) { return true; } else { return false; }
}

function isSequencial(valor) {
    if(valor[0].repeat(valor.length) === valor) return true;

}

function isValid(valor) {
    const cpfClean = valor.replace(/\D/g, '');

    if(!cpfClean) alert('Insira um CPF.');
    if(typeof cpfClean !== 'string') return false;
    if(cpfClean.length !== 11) return false;
    if(isSequencial(cpfClean)) return false;
    if(!(isCPFValid(cpfClean))) return false;

    return true;

}
