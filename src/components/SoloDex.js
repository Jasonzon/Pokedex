import "../styles/SoloDex.css"
import Pokemon from "./Pokemon"

function SoloDex({activePokemon, setActivePokemon, PokemonList, setPokemonList}) {
    return (
        <div>
            {PokemonList.map(({name, url}) =>
                activePokemon === name ? (
                <Pokemon 
                    name={name}
                    url={url}
                /> ) : null
            )}
        </div>
    )
}

export default SoloDex