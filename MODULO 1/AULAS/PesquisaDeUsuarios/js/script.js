window.addEventListener('load', start);

let database = {};

const divUsers = document.querySelector('#users');

async function start() {
  const url = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';
  const data = await fetch(url).then(res => {
    res.json().then(json => {
      database = json;
    })
  });

  const searchButton = document.querySelector('#searchButton');
  searchButton.addEventListener('click', searchUser);

  const searchInput = document.querySelector('#searchInput');
  searchInput.focus();
}

function render(user) {
  let ul = document.createElement('ul');

  let li = document.createElement('li');
  li.classList.add('w-100');
  li.innerHTML = `<img class="profile" src=${user.picture.thumbnail}>${user.name.first} ${user.name.last}, ${user.dob.age} anos`;

  ul.appendChild(li);

  divUsers.appendChild(ul);
}

function searchUser() {
  let user = searchInput.value.toLowerCase();
  let usersSearched = 0;
  let usersMale = 0;
  let usersFemale = 0;
  let ages = 0;

  divUsers.innerHTML = '';

  database.results.filter(e => {
    let name = `${e.name.first} ${e.name.last}`;

    if (name.toLowerCase().includes(user)) {
      console.log(e);
      render(e);
      usersSearched++;

      e.gender === 'male' ? usersMale++ : usersFemale++;
      ages += e.dob.age;
    }
  });

  let media = mediaAges(ages, usersSearched);

  const searchTitle = document.querySelector('#searchTitle');
  searchTitle.textContent = `${usersSearched} usuário(s) encontrado(s)`;

  // const infoTitle = document.querySelector('#infoTitle');
  // infoTitle.textContent = 'Estatísticas';
  // const infoDiv = document.querySelector('#info');

  // let ul = document.createElement('ul');
  // let li = document.createElement('li');

  // li.innerHTML = `Sexo masculino: ${usersMale}`;

  // ul.appendChild(li);
  // infoDiv.appendChild(ul);

  console.log(`${usersMale} masculino e ${usersFemale} feminino`);
  console.log(`Média: ${media}`);
  console.log(`Soma das idades: ${ages}`);
}

function mediaAges(ages, quantity) {
  return (ages / quantity).toFixed(2);
}
