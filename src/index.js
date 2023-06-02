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
    refs.list.innerHTML = '';
    return;
  }

  fetchCountries(e.target.value.trim())
    .then(result => {
        if (result.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
    
        return;
      }

      if (result.length >= 2 || result.length <= 10) {
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

      if (result.length === 1) {
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
    })
    .catch(() => {
        refs.list.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
