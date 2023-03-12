/*
  1. W pliku data.js pod zmienna "pokemons" znajduje się tablica zawierająca dane wielu pokemonów, masz do niej dostęp również w tym pliku. 
  Chciałbym, abyś użył jej do wyświetlenia wszystkich pokemonów w naszym Pokedexie. 
  W tym celu dla każdego z nich możesz stworzyć nowy element drzeewa DOM i umieścić w nim informacje o Pokemonie (możesz zawrzeć tam jego nazwę, zdjęcie, a na kontener w którym się znajduje nadać specjalną klasę zależnie od typu)
*/

// tutaj złapiemy sekcję, do której będziemy dodawać pokemony
const pokemonsContainer = document.querySelector(".pokemons");

function renderPokemons(pokemons) {
  for (pokemon of pokemons) {
    // tutaj możesz stworzyć nowy element drzewa DOM, który będzie reprezentował pokemona
    // możesz go umieścić w zmiennej, aby móc go potem dodać do DOM
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
    for (type of pokemon.types) {
      pokemonElement.classList.add(type);
    }
    pokemonElement.innerHTML = `
      <div class="pokemon-image">
        <img src="${pokemon.image}" alt="${pokemon.name}" />
      </div>
      <div class="pokemon-info">
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <div class="pokemon-types">
          ${pokemon.types
            .map((type) => `<span class="pokemon-type">${type}</span>`)
            .join(", ")}
        </div>
      </div>
    `;


    // dodaj nowo utworzony element do sekcji pokemonsContainer
    pokemonsContainer.appendChild(pokemonElement);
  }
}

// następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
renderPokemons(pokemons);

/*
  2. Przeglądanie całej listy pokemonów może okazać się trochę uciążliwe. Fajnie byłoby skorzystać z filtrów, które już znajdują sie w pliku html. 
  Napisz ciało funkcji które pozwoli nam na:
  - filtrowanie po typie
  - filtrowanie po nazwie (wpisany fragment zawiera się w nazwie pokemona)
*/

function filterPokemons(pokemons, types, name) {
  // tutaj możesz napisać kod, który będzie filtrował tablicę pokemons
  // zwróć nową tablicę, która będzie zawierała tylko te elementy, które spełniają warunki podane w parametrach
  const filteredPokemons = pokemons.filter((pokemon) => {
    const isTypeMatch = types.length
      ? pokemon.types.some((type) => types.includes(type))
      : true;
    const isNameMatch = pokemon.name
      .toLowerCase()
      .includes(name.toLowerCase());
    return isTypeMatch && isNameMatch;
  });
  return filteredPokemons;
}

const form = document.querySelector("form");

function submitForm(event) {
  event.preventDefault();
  let types = [];
  const typeInputs = document.querySelectorAll('input[type="checkbox"]');
  for (typeInput of typeInputs) {
    if (typeInput.checked) {
      types.push(typeInput.id);
    }
  }
  const pokemonName = document.querySelector('input[id="pokemon-name"]').value;
  pokemonsContainer.innerHTML = "";
  renderPokemons(filterPokemons(pokemons, types, pokemonName));
}

form.addEventListener("submit", submitForm);

/*
  3. Pokedex powinien wyglądać trochę lepiej, niż ten tutaj. W folderze znajdziesz plik style.css, w którym możesz ulepszyć wygląd naszego pokedexa
  Liczymy na Twoją kreatywność 😉
*/
