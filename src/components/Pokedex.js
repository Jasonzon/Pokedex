import '../styles/Pokedex.css'
//import Pokemon from "./Pokemon"
import {useState} from "react"
import black from "../assets/pixelball.png"

function Pokedex({inputValue, setInputValue, activeType, setActiveType}) { 
    const [PokemonList, setPokemonList] = useState([])
    async function getPokemons() {
        const fet = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25")
        const j = await fet.json()
        const k = await j.results
        setPokemonList(k)
    }
    getPokemons()
    /*return (
        <div>
            <ul className="pokedex-pokemon-list">
            {PokemonList.map(({name, url}, index) => 
            name.includes(inputValue) ? (
                <div key={index}>
                    <Pokemon 
                        name={name}
                        url={url}
                    />
                </div>) : null 
            )}
            </ul>
        </div>
    )*/

    return (
        <div>
            <ul className="pokedex-pokemon-list">
                {PokemonList.map(({name, url}, index) => 
                    name.includes(inputValue) ? (
                    <div key={index} className="pokedex-pokemon-span">
                        <img src={black} alt="logo-black-pokeball" width="25" height="25"/>
                        <span className="name">{name}</span>
                    </div>) : null 
                )}
            </ul>
        </div>
    )
}

export default Pokedex
