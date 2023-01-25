import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//to clean anf trim
searchBox.addEventListener(
  'input',
  debounce(() => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (searchBox.value !== '') {
      searchBox.value.trim();
    }
    return;
  }, DEBOUNCE_DELAY)
);

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/fields=name,capital,population,languages,flags`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

// const countryDetails = country {
// countryInfo.innerHTML = `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
// }
