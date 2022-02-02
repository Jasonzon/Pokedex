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
                    <div key={index} className="font-face-gm" >
                        <li 
                            className={activePokemon===name ?"pokedex-pokemon-span-selected":"pokedex-pokemon-span"}
                            onClick={() => setActivePokemon(name)} 
                        >
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
//onClick={() => name===activePokemon? (setActiveStyle("pokedex-pokemon-span-selected")):null}