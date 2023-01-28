import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const countries = name => {
  fetchCountries(name)
    .then(input => {
      if (input.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (input.length > 1) {
        input.forEach(country => {
          listElem(country);
        });
      } else {
        countryInfo.innerHTML = '';
        input.forEach(country => {
          listElemDetails(country);
        });
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
};

// DOM
const listElem = country => {
  countryList.insertAdjacentHTML(
    'beforeend',
    `<li class="country-info__elem">
  <img src="${country.flags.svg}" width="60" height="50"/>
  <h2>${country.name}</h2> </li>`
  );
};

const listElemDetails = country => {
  countryInfo.innerHTML = `<li class="country-info__elem">
    <img src="${country.flags.svg}" width="60" height="50"/>
    <h2>${country.name}</h2>
    <p>${country.capital}</p>
    <p>${country.population}</p>
    <p>${country.languages}</p>
    </li>`;
};

searchBox.addEventListener(
  'input',
  debounce(() => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (searchBox.value !== '') {
      countries(searchBox.value.trim());
    } else {
      return;
    }
  }, DEBOUNCE_DELAY)
);
