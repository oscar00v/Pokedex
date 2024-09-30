console.log("api");

const URL_BASE = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json'//todo esta por algun motivo no jala

// const URL_CODE = 'https://cors-anywhere.herokuapp.com/';  // Proxy CORS gratuito
const detailPageURL ='/us/pokedex/'//!la liga que se va a utilizar para las paginas 

const form = document.querySelector('form');
const inputText = document.querySelector('input[type="text"]');

async function getPokemon(url) {
    const response = await fetch(url);
    console.log(response);
 
    if(!response.ok){
        renderError(response.status);
        return undefined;
    }
 
    const data = await response.json()
    return data[0];
 }

//  function renderPokemon(data){
//     main.innerHTML = (`
//         <h1>
//         <span class = "Name">${data.name.common}</span> 
//         //! creo que si es asi
//         <span class = "Numero">${data.number.common}</span>
//         </h1>
//         <img src=${data.ThumbnailImage.png} alt={data.flag.alt} />
//         `);

//  }

// async function submitHandler(e) {
//     e.preventDefault();
//     const inputValue = inputText.value;
//     const pokemonName = inputValue.toLowerCase();
//     const url = `${URL_BASE}${pokemonName}`
//     console.log(url);
//     const getPokemonVar = await getPokemon(url);
//     console.log(getPokemonVar);

//     if(!getPokemonVar) return;

//     renderPokemon(getPokemonVar);



// }




 getPokemon(URL_BASE);

form.addEventListener('submit',(e)=>
    submitHandler(e));
