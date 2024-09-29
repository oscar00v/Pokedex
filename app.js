console.log("api");

const URL_BASE = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json'
// const URL_CODE = 'https://cors-anywhere.herokuapp.com/';  // Proxy CORS gratuito
const detailPageURL ='/us/pokedex/'

async function getPokemon(url) {
     const response = await fetch(URL_CODE + url, {
        mode: 'cors'
    });
    console.log(response);

    if(!response.ok){
        renderError(response.status);
        return undefined;
    }

    const data = await response.json()
    return data[0];
}

getPokemon(URL_BASE);

const form = document.querySelector('form');
const inputText = document.querySelector('input[type="text"]');
const url = `${detailPageURL}`

async function submitHandler(e) {
    e.preventDefault();
    const inputValue = inputText.value;
    const pokemonName = inputValue.toLowerCase();
    console.log(`${detailPageURL}${pokemonName}`);
}



form.addEventListener('submit',(e)=>
    submitHandler(e));
