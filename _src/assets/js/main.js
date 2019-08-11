'use strict';

const input = document.querySelector('.input__Search');
const btnSearch = document.querySelector('.btn__search');
let resultsList = document.querySelector('.results__list');

//variables declaradas de forma global para poder usarlas en las distintas funciones
let searchValue = '';
let endpoint ='';
let itemResult = {
  'name': '',
  'image': '',
  'nickname': '',
  'status': ''

};

//función para mostrar los resultados en pantalla
function showResult(){
  resultsList.innerHTML = `
  <li>
  <h3>${itemResult.name}</h3>
  <h4>${itemResult.nickname}</h4>
  <h5>${itemResult.status}<h5>
  <img src="${itemResult.image}">
  </li>
  `;
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
