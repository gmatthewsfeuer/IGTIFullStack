window.addEventListener('load', start);

const inputActualNumber = document.querySelector('#actualNumber');
const inputExtensiveNumber = document.querySelector('#extensiveNumber');

const c1 = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const c2 = ['vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const c3 = ['cem', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
const es = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];

let string = [];

function start() {
  const inputRange = document.querySelector('#rangeNumber');

  inputRange.addEventListener('input', getValue);
}

function getValue(event) {
  inputExtensiveNumber.value = '';

  number = event.target.value;

  inputActualNumber.value = number;
  checkChars(number);
}

function char1(number) {
  charText(number, c1);
}

function char2(number) {
  numberInt = Number(number);

  if ((numberInt >= 10) && (numberInt <= 19)) {
    charText(number[1], es);
  } else {
    if (number[1] === '0') {
      charText(number[0] - 2, c2);
    } else {
      charText(number[0] - 2, c2);
      char1(number[1]);
    }
  }
}

function char3(number) {
  if (number === '100') {
    charText(0, c3);
  } else {
    charText(number[0], c3);

    char2(number.substring(1));
  }
}

function charText(indexNumber, array) {
  performArray(array, indexNumber);
}

function performArray(array, indexNumber) {
  indexNumber = Number(indexNumber);
  
  array.forEach((element, index) => {
    if (indexNumber === index) {
      string.push((element));
    }
  });
}

function checkChars(number) {
  let length = number.length;

  string = [];

  if (length === 3) {
    char3(number);
  } else if (length === 2) {
    char2(number);
  } else {
    char1(number);
  }

  render();
}

function render() {
  inputExtensiveNumber.value = string.join(' e ');
}
