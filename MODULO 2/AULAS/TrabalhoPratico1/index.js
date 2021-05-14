import { promises as fs } from 'fs';

const URL_DATABASE = './database/';
const URL_STATES = './Estados/';

const readFiles = (path, file) => fs.readFile(`${path}${file}`);

const parseJSON = json => JSON.parse(json);

const stringifyJSON = data => JSON.stringify(data, null, 2);

async function readData(path, json) {
  try {
    const data = parseJSON(await readFiles(path, json));

    return data;
  } catch (err) {
    console.log(err);
  }
}

const writeData = (file, data) => fs.writeFile(file, stringifyJSON(data));

async function createData(citiesData, statesData) {
  try {
    const cities = await readData(URL_DATABASE, citiesData);
    const states = await readData(URL_DATABASE, statesData);

    states.forEach(state => {
      const data = [];

      cities.forEach(city => {
        // city.Estado === state.ID ? data.push(city.Nome) : '';
        if (city.Estado === state.ID) {
          data.push(city.Nome);
        }
      });

      writeData(`${URL_STATES}${state.Sigla}.json`, { cidades: data.sort() });
    });

  } catch (err) {
    console.log(err);
  }
}

async function loopStates(statesData) {
  try {
    const states = await readData(URL_DATABASE, statesData);

    const cities = [];

    for (const state of states) {
      cities.push(await readStates(state.Sigla));
    }

    firstFiveBiggestNumbers(cities);
    firstFiveSmallestNumbers(cities);
    biggestNames(cities);
    smallestNames(cities);
  } catch (err) {
    console.log(err);
  }
}

function firstFiveBiggestNumbers(array) {
  array.sort((a, b) => b.length - a.length);

  array = array.slice(0, 5);

  array.forEach((element, index) => {
    array[index] = `${element.uf} – ${element.length}`;
  });

  console.log(array);
}

function firstFiveSmallestNumbers(array) {
  array.sort((a, b) => a.length - b.length);

  array = array.slice(0, 5);

  array.forEach((element, index) => {
    array[index] = `${element.uf} – ${element.length}`;
  });

  console.log(array);
}

function biggestNames(array) {
  const names = [];
  
  array.forEach(element => {
    let citiesOrdened = element.cities.sort((a, b) => b.length - a.length);

    names.push(`${citiesOrdened[0]} – ${element.uf}`);
  });

  names.sort((a, b) => b.length - a.length || a.localeCompare(b));
  console.log(names);
}

function smallestNames(array) {
  const names = [];
  
  array.forEach(element => {
    let citiesOrdened = element.cities.sort((a, b) => a.length - b.length);

    names.push(`${citiesOrdened[0]} – ${element.uf}`);
  });

  names.sort((a, b) => a.length - b.length || a.localeCompare(b));
  console.log(names);
}

async function readStates(uf) {
  const data = await readData(URL_STATES, `${uf}.json`);

  const cities = data.cidades;
  const length = data.cidades.length;

  return {
    uf,
    cities,
    length
  };
}

async function init() {
  createData('Cidades.json', 'Estados.json');
  loopStates('Estados.json');
}

init();
