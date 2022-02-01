import '../styles/Pokedex.css'
import black from "../assets/pixelball.png"
import SoloDex from "./SoloDex"
import {useState} from "react"

function Pokedex({inputValue, activeType, PokemonList}) { 
    const [activePokemon, setActivePokemon] = useState("") //modif quand on clique sur un poke

    return (
        <div>
            <SoloDex 
                activePokemon={activePokemon}
                PokemonList={PokemonList}
            />
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
        </div>
    )
}

export default Pokedex
