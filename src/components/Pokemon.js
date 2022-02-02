import '../styles/Pokemon.css'
import blue from '../assets/blue-pokeball.png'
import pink from '../assets/pink-pokeball.png'
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
                <span className="pokemon-name-id">{name} No.{id}</span>
                <img className='pokemon-image' src={sprites.other.dream_world.front_default} alt={`${name}`} width="250" height="250"/>
                <div className="pokemon-gender">
                    <span>Gender :</span>
                    <img className="pokemon-blue-ball" src={blue} alt="blue pokeball" />
                    <img className="pokemon-pink-ball" src={pink} alt="pink pokeball" />
                </div>
                <span className="pokemon-height">Taille: {height} dm</span>
                <span className="pokemon-weight">Poids: {weight} hg</span>
                <ul className="pokemon-types">
                    {types.map(({type},index) => <>
                        <div key={index}>
                            <PokemonTypes 
                                type={type.name}
                            />
                        </div>
                </> )}
                </ul>
           </> )}
        </div> 
    )
}

export default Pokemon