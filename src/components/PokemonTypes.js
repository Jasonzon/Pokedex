import "../styles/PokemonTypes.css"

function PokemonTypes({type}) {
    return (
        <li className={`pokemon-type-${type}`}>
            <span>{type}</span>
        </li>
    )
}

export default PokemonTypes