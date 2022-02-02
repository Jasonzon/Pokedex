import "../styles/PokemonTypes.css"

function PokemonTypes({type}) {
    return (
        <div className={`pokemon-type-${type}`}>
            <span>{type}</span>
        </div>
    )
}

export default PokemonTypes