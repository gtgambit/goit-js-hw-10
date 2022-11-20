import "./css/styles.css";
//import createCountryCards from "./templates/countryInfoCards.hbs";
import { fetchCountries } from "./js/fetchCountries.js";
import Notiflix from "notiflix";
import { debounce } from "lodash";

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector("#search-box");
const ulEl = document.querySelector(".country-list");
const divEl = document.querySelector(".country-info");
let countryName = null;
inputEl.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(countryName) {
  countryName = inputEl.value.trim().toLowerCase();
  fetchCountries(countryName)
    .then((data) => renderCountry(data))
    .catch((error) => {
      if (error.message === "404") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      }
    });
}

function renderCountry(countryObj) {
  if (countryObj.length === 1) {
    let countryInfo = countryObj.map(
      ({ languages, population, capital, name, flags }) => {
        return `
          <h2>
          <img class="item-flag" src="${flags.svg}" alt=${
          name.official
        }width="18" height="16">
        </img>${name.official}</h2>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>
            Languages:
            ${Object.values(languages)}
          </p>`;
      }
    );
    ulEl.innerHTML = "";
    divEl.innerHTML = "";
    divEl.innerHTML = countryInfo;
    return;
  }
  if (countryObj.length >= 2 && countryObj.length <= 10) {
    let countryInfo = countryObj
      .map(({ name, flags }) => {
        return `<li class="country-list-item">
      <h2>
      <img class="item-flag" src="${flags.svg}" alt=${name.official} width="18" height="16">
    </img>
     ${name.official}</h2>
  </li>`;
      })
      .join("");
    ulEl.innerHTML = "";
    divEl.innerHTML = "";
    ulEl.innerHTML = countryInfo;
    return;
  }
  divEl.innerHTML = "";
  ulEl.innerHTML = "";
  Notiflix.Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
}
//  const countryInfoCards = createCountryCards(country);
//
