window.addEventListener('load', start);

const globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

function start() {
  preventFormSubmit();
  
  inputName = document.querySelector('#name');

  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  const form = document.querySelector('form');

  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();

      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    let button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;

      currentIndex = index;
    }

    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  const divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  let ul = document.createElement('ul');

  globalNames.forEach((element, index) => {
    let li = document.createElement('li');
    let button = createDeleteButton(index);
    let span = createSpan(element, index);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  });

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
