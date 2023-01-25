export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}fields=name,capital,population,languages,flags`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(input => {
      if (input.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (input.length > 1) {
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}
