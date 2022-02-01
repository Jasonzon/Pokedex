import '../styles/Pokedex.css'
import black from "../assets/pixelball.png"

function Pokedex({inputValue, setInputValue, activeType, setActiveType, activePokemon, setActivePokemon, PokemonList, setPokemonList}) { 
    return (
        <div>
            <ul className="pokedex-pokemon-list">
                {PokemonList.map(({name, url}, index) => 
                    name.includes(inputValue) ? (
                    <div key={index} className="pokedex-pokemon-span">
                        <li onClick={() => setActivePokemon(name)}>
                            <img src={black} alt="logo-black-pokeball" width="25" height="25"/>
                            <span className="name">{name}</span>
                        </li>
                    </div>) : null 
                )}
            </ul>
        </div>
    )
}

export default Pokedex
