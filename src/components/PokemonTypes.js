import "../styles/PokemonTypes.css"

function PokemonTypes({type}) {
    console.log({type})
    return (
        <li className={`pokemon-type-${type}`}>
            <span>{type}</span>
        </li>
    )
}

export default PokemonTypes