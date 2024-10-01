console.log("api");

// const URL_BASE = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json'//todo esta por algun motivo no jala
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
// const URL_CODE = 'https://cors-anywhere.herokuapp.com/';  // Proxy CORS gratuito
const detailPageURL ='/us/pokedex/'//!la liga que se va a utilizar para las paginas 

const form = document.querySelector('form');
const inputText = document.querySelector('input[type="text"]');

async function getPokemon(URL) {
    const response = await fetch(URL);// {mode: 'no-cors'});
    console.log("La respuesta:", response);
 
    if(!response.ok){
        renderError(response.status);
        return undefined;
    }
 
    const data = await response.json();
    console.log("data:",data);
    return data;
 }

 async function getPokemonDetails(URLPokemon) {
    const response = await fetch(URLPokemon);
    const datapokemon = await response.json();
    console.log(datapokemon);
    return datapokemon;
 }

 function renderPokemonData(data, searchValue) {

    const pokemon = data.results.find(pokemonItem  => pokemonItem .name.toLowerCase() === searchValue.toLowerCase());
    if (!pokemon) {
        console.log("Pokémon no encontrado");
        return;
    }

    // Imprime los detalles del Pokémon en consola
    console.log(`Nombre: ${pokemon.name}`);
    console.log(`URL de detalles: ${pokemon.url}`);

    return pokemon.url;
}



 function renderPokemonCard(data){
    const pokemonGrid = document.getElementById('pokemon-grid');

    const pokemonHTML = `
        <div class="pokemon-card">
            <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º ${data.id}</h1>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Altura: ${data.height / 10} m</p>
            <p>Peso: ${data.weight / 10} kg</p>
            <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
            <p>Habilidades: ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
             
        </div>
    `;

    pokemonGrid.innerHTML = pokemonHTML;
}


async function submitHandler(e) {
    e.preventDefault(); // Evita el recargo de la página
    const inputValue = inputText.value;
    if (!inputValue) {
        console.log("Por favor ingresa un nombre o número de Pokémon");
        return;
    }
    // Llama a la función para obtener los datos del Pokémon
    const pokemonData = await getPokemon(URL_BASE);
    const renderpokemon = await renderPokemonData(pokemonData, inputValue);

       
    const PokemonCard = await getPokemonDetails(renderpokemon)
    await renderPokemonCard(PokemonCard);

}


//  getPokemon(URL_BASE);

form.addEventListener('submit',(e)=>
    submitHandler(e));
