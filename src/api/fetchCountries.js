export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
      .then(result => {
        if (!result.ok) {
            throw new Error(result.status);
        }
        return result.json();
    })
      
}
