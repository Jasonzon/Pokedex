import '../styles/Pokemon.css'
import PokemonTypes from "./PokemonTypes"
import {useState} from "react"

function Pokemon({name, url}) {
    const [ThePokemon, setThePokemon] = useState([])
    async function getPokemon() {
        const fet = await fetch(url)
        const j = await fet.json()
        setThePokemon([j])
    }
    if (ThePokemon.length === 0) {
        getPokemon()
    }
    return ( 
        <div className="pokemon-item">
            {ThePokemon.map(({id, sprites, height, weight, types}) => <>
                <span className={["pokemon-name-id","font-face-gm"].join(" ")}>{name} No.{id}</span>
                <img className='pokemon-image' src={sprites.other.dream_world.front_default} alt={`${name}`} width="250" height="250"/>
                <span className="pokemon-height">Taille: {height} decimeters</span>
                <span className="pokemon-weight">Poids: {weight} hectograms</span>
                <div className="pokemon-div-types">
                        {types.map(({type}) => <>
                                <PokemonTypes 
                                    type={type.name}
                                />
                    </> )}
                </div>
           </> )}
        </div> 
    )
}

export default Pokemon