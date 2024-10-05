console.log("api");

// const URL_BASE = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json'//todo esta por algun motivo no jala
const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
// const URL_CODE = 'https://cors-anywhere.herokuapp.com/';  // Proxy CORS gratuito


const form = document.querySelector('form');
const inputText = document.querySelector('input[type="text"]');
//!la primera api
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
     // Verificar si el valor ingresado es un número
    const isNumber = !isNaN(searchValue);
    


     let pokemon;
 
     if (isNumber) {
         // Buscar por número (ID)
         pokemon = data.results.find(pokemonItem => pokemonItem.url.includes(`/${searchValue}/`));
         console.log(pokemon);
         
     } else {
         // Buscar por nombre
         pokemon = data.results.find(pokemonItem => pokemonItem.name.toLowerCase() === searchValue.toLowerCase());
         console.log(pokemon);
     }
 
     if (!pokemon) {
         console.log("Pokémon no encontrado");
         return;
     }
 
     // Imprime los detalles del Pokémon en consola
     console.log(`Nombre: ${pokemon.name}`);
     console.log(`URL de detalles: ${pokemon.url}`);
 
     return pokemon.url;


    // const pokemon = data.results.find(pokemonItem  => pokemonItem .name.toLowerCase() === searchValue.toLowerCase());
    // if (!pokemon) {
    //     console.log("Pokémon no encontrado");
    //     return;
    // }

    // // Imprime los detalles del Pokémon en consola
    // console.log(`Nombre: ${pokemon.name}`);
    // console.log(`URL de detalles: ${pokemon.url}`);

    // return pokemon.url;
}



 function renderPokemonCard(data){
    const pokemonGrid = document.getElementById('pokemon-grid');
    let className = "";//switch case grass = verde 
    const pokemonHTML = `
        <div class="pokemon-card">
            <div class = "pokemon-Name">
                <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.º ${data.id}</h1></div>

            <div class = "pokemon-image">
            
            </div>
            <div class = "pokemon-details">
                <div class = "pokemon-columns"> <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}"></div>
                <div class = "pokemon-columns">

                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                
                    <p><strong>Tipo:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
                
                <p><strong>Habilidades:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p></div>
            </div>
        <div class="pokemon-sprites">
            <h2>Sprites</h2>
            <div class="sprites-container">
                <div class="sprite-column">
                    <img src="${data.sprites.front_default}" alt="Front sprite">
                </div>
                    <div class="sprite-column">
                    <img src="${data.sprites.back_default}" alt="Back sprite">
                </div>
            </div>
        </div>
             
    </div>
    `;
    // appeends para agregar las classes 
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

    if (!renderpokemon) {
        console.log("No se pudo encontrar el Pokémon.");
        return;
    }

    // Ocultar todas las demás tarjetas excepto la buscada
    const allCards = document.querySelectorAll('.minipokemon-card');
    allCards.forEach(card => {
        card.style.display = 'none';  // Ocultar todas
    });
       
    const PokemonCard = await getPokemonDetails(renderpokemon)
    await renderPokemonCard(PokemonCard);

}

async function renderAllPokemon() {
     const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'; // Cambié para cargar los primeros 151 Pokémon.

    const allpokemonData = await getPokemon(URL_BASE);

    const pokemonGrid = document.getElementById('pokemon-grid2');
    pokemonGrid.innerHTML = '';  // Limpia el grid antes de renderizar

    // Iterar sobre los resultados y renderizar cada Pokémon
    for (const pokemonItem of allpokemonData.results) {
        const pokemonDetails = await getPokemonDetails(pokemonItem.url);
        const pokemonHTML = `
            <div class="minipokemon-card" id="pokemon-${pokemonDetails.id}">
                <div class="minipokemon-Name">
                    <h2>#${String(pokemonDetails.id).padStart(3, '0')}</h2>
                    <h3>${pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h3>
                </div>
                <div class="minipokemon-image">
                    <img src="${pokemonDetails.sprites.other['official-artwork'].front_default}" alt="${pokemonDetails.name}">
                </div>
                <div class="minipokemon-type">
                    ${pokemonDetails.types.map(type => `<span class="type-${type.type.name}">${type.type.name}</span>`).join(' ')}
                </div>
            </div>
        `;
        pokemonGrid.innerHTML += pokemonHTML; // Añade las tarjetas al grid
    }
}

document.addEventListener('DOMContentLoaded', () => renderAllPokemon());

//  getPokemon(URL_BASE);

form.addEventListener('submit',(e)=>
    submitHandler(e));
