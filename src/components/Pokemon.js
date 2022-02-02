import '../styles/Pokemon.css'
import PokemonTypes from "./PokemonTypes"
import {useState} from "react"

function Pokemon({name, url}) {
    const [ThePokemon, setThePokemon] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    async function getPokemon() {
        const fet = await fetch(url)
        const j = await fet.json()
        setThePokemon([j])
    }
    if (ThePokemon.length === 0) {
        getPokemon()
    }
    
    return (
        <div>
        <div className="pokemon-item">
            <div className="pokemon-item-main">
                {ThePokemon.map(({id, sprites, types}) => <>
                <span className="pokemon-name-id font-face-gm">{name} No.{id}</span>
                <img 
                    className='pokemon-image' 
                    src={sprites.other.dream_world.front_default} 
                    alt={`${name}`} 
                    width="250" 
                    height="250"
                    onLoad={() => setIsLoaded(true)}
                />
                <div className="pokemon-div-types">
                        {types.map(({type}) => <>
                                <PokemonTypes 
                                    type={type.name}
                                />
                    </> )}
                </div>
           </> )}
           </div>
           <div className="pokemon-item-secondary">
                {ThePokemon.map(({height, weight}) =>
                    <div className="pokemon-height-weight">
                        <span className="pokemon-height font-face-gm">Taille: {height/10} m</span>
                        <span className="pokemon-weight font-face-gm">Poids: {weight/10} kg</span>
                    </div>
                )}
           </div>
        </div>
        {isLoaded ? null :<div className="pokemon-item-not-loaded"></div>}
        </div>
    )
}

export default Pokemon