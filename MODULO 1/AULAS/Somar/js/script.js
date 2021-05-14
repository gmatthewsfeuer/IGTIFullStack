window.addEventListener('load', start);

function start() {
  const valor1 = document.querySelector('#valor1');
  const valor2 = document.querySelector('#valor2');

  valor1.addEventListener('keyup', calcular);
  valor2.addEventListener('keyup', calcular);
}

function calcular() {
  let v1 = Number(valor1.value);
  let v2 = Number(valor2.value);

  let soma = v1 + v2;
  let subt = v1 - v2;
  let divi = v1 / v2;
  let mult = v1 * v2;

  const resultados = [soma, subt, divi, mult];

  const span = document.querySelector('#resultado');
  span.innerHTML = "";

  resultados.forEach(element => {
    span.innerHTML += `${element} <br>`;
  });
}
