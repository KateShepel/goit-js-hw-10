import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('.countries_list'),
};

refs.input.addEventListener('input', debounce(inputHandler, 300));

function inputHandler(e) {
  if (e.target.value.trim() === '') {
    cleanerPage();
    return;
  }

  fetchCountries(e.target.value.trim())
    .then(result => {
        if (result.length > 10) {
          infoMessage();
        return;
      }

      if (result.length >= 2 || result.length <= 10) {
        createAllElements(result);
      }

        if (result.length === 1) {
            createMainElement(result);
        }
    })
    .catch(() => {
        cleanerPage();
        errorMessage();
    });
}

function cleanerPage() {
  refs.list.innerHTML = '';  
}

function infoMessage() {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
}

function errorMessage() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createAllElements(result) {
    refs.list.innerHTML = result
      .map(
        element => `
            <li class="item">
                <div class=container>
                    <img width="20" height="20" src="${element.flags.svg}" alt="countries flag"/>
                    <p class="countrie_name_list">${element.name.official}</p>
                </div>
            </li>`
      )
      .join('');
}

function createMainElement(result) {
    refs.list.innerHTML = result.map(
          element => `
            <li class="item">
                <div class=container>
                    <img width="30" height="30" src="${
                      element.flags.svg
                    }" alt="countries flag"/>
                    <p class="countrie_name">${element.name.official}</p>
                </div>
                <p class="countrie_info"><span>Capital: </span>${
                  element.capital
                }</p>    
                <p class="countrie_info"><span>Population: </span>${
                  element.population
                }</p>
                <p class="countrie_info"><span>Languages: </span>${Object.values(
                  element.languages
                ).join(', ')}</p>
            </li>`
        );
}