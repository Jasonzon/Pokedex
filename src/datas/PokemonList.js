/*const PokemonList = fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
.then(res => res.json())
.then(data => {
    return data.results
})

export {PokemonList}

async function getPokemons() {
    const fetch = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    pokemons = fetch.data;
}
  
  let pokemons = [];
  let pokemon;
  
  export default function Pokedex() {
    getPokemons();
    return (
      <div>
        <h1>Pokedex</h1>
        {pokemons.map((pokemon) => {
          return <p>{pokemon.name}</p>;
        })}
      </div>
    );
  }*/