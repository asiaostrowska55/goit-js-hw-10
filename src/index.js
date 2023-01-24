import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(() => {
    const search = searchBox.value;
    console.log('input:', search);
    if (search.length < 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
  }, DEBOUNCE_DELAY)
);
