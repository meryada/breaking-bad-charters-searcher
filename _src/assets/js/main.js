'use strict';

const input = document.querySelector('.input__Search');
const btnSearch = document.querySelector('.btn__search');
let resultsList = document.querySelector('.results__list');
let favNewItem = document.querySelector('.fav__newItem');

//variables declaradas de forma global para poder usarlas en las distintas funciones
let searchValue = '';
let endpoint ='';
let itemResult = {
  'name': '',
  'image': '',
  'nickname': '',
  'status': ''
};

const favs = [];
let currentCharacterObjet = {
  'favName': '',
  'favNickname': ''
}



function handleFav(event){
  const currentCharacter = event.currentTarget;
  currentCharacterObjet = {
    'favName': currentCharacter.getAttribute('data-name'),
    'favNickname': currentCharacter.getAttribute('data-name')
  }

  currentCharacter.classList.toggle('favourite');


  if (currentCharacter.classList.contains('favourite') === true){
  //añade elemento al array de favoritos
    favs.push(currentCharacterObjet);
  }else {
  //quitamos del array de favoritos
  }
  //pintar el array
  console.log(currentCharacter);
  console.log(favs);
}

function activateFavs(){
  let mycharacter = document.querySelector('.newItem');
  mycharacter.addEventListener('click', handleFav);
}

//función para mostrar los resultados en pantalla
function showResult(){
  resultsList.innerHTML = `
  <li class="newItem" data-name="${itemResult.name}" data-nickname="${itemResult.nickname}">
  <h3 class="newItem__title">${itemResult.name}</h3>
  <h4 class="newItem__nickname">${itemResult.nickname}</h4>
  <h4 class="newItem__status">${itemResult.status}<h4>
  <img class="image" src="${itemResult.image}">
  </li>
  `;

  activateFavs();
}

//función que hace la petición al API
function getApiResults(){
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      for (let item of data) {
        //por cada vuelta guardamos un objeto y lo metemos a un array
        itemResult = {
          'name': item.name,
          'image': item.img,
          'nickname': item.nickname,
          'status': item.status
        };
      }

      showResult();
    });
}

//función que añade el valor del input a la url base para poder hacer la búsqueda
function getCompleteEndpoint(){
  const urlBase = 'https://www.breakingbadapi.com/api/characters?name=';
  endpoint = urlBase + searchValue;

  getApiResults();
}

//función que saca el valor del input
function getValueSearch(){
  searchValue = input.value;

  getCompleteEndpoint();
}

btnSearch.addEventListener('click', getValueSearch);
