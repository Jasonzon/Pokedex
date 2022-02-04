import "../styles/SoloDex.css"
import Pokemon from "./Pokemon"

function SoloDex({activePokemon, PokemonList, scrollPosition}) {
    return (
        <div>
            {PokemonList.map(({name, url}) =>
                activePokemon === name ? (
                <Pokemon 
                    name={name}
                    url={url}
                    scrollPosition={scrollPosition}
                /> ) : null
            )}
        </div>
    )
}

export default SoloDex