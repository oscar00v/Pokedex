console.log("api");


async function getPokemon() {
     const response = await fetch('https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json');
    console.log(response);
    const data = await response.json()
    console.log(data);
}

getPokemon();
