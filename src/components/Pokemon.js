import '../styles/Pokemon.css'
import PokemonTypes from "./PokemonTypes"
import {useState, useEffect} from "react"

function Pokemon({name, url, scrollPosition}) {
    const [ThePokemon, setThePokemon] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    async function getPokemon() {
        const fet = await fetch(url)
        const j = await fet.json()
        setThePokemon([j])
    }
    
    useEffect(() => getPokemon(),[])

    const [specie, setSpecie] = useState([])
    async function getSpecie() {
        const fet = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        const j = await fet.json()
        setSpecie([j])
    }

    useEffect(() => getSpecie(),[])
    
    return (
        <div>
        <div className="pokemon-item" style={{top:`${scrollPosition-100}px`}}>
            <div className="pokemon-first">
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
           <div className="pokemon-item-tertiary font-face-gm">
                {specie.map(({evolution_chain,flavor_text_entries,genera,habitat,is_baby,is_legendary,is_mythical,shape,varieties}) => <>
                    {flavor_text_entries.map(({flavor_text,language,version}) => <> 
                        {language.name==="en" && version.name==="shield" ? <span className="pokemon-flavor-text">{flavor_text}</span> :null}
                    </>)}
                    <span className="pokemon-genera">{genera[7].genus}</span>
                    <span className="pokemon-habitat">Habitat: {habitat.name}</span>
                    {is_baby ? <span className="pokemon-baby">baby pokemon</span>:null}
                    {is_mythical ? <span className="pokemon-mythical">mythical pokemon</span>:null}
                    {is_legendary ? <span className="pokemon-legendary">legendary pokemon</span>:null}
                    <span className="pokemon-shape">Shape: {shape.name}</span>
             </>  )}
             <div className="pokemon-item-secondary">
                {ThePokemon.map(({height, weight,stats}) => <>
                    <div className="pokemon-height-weight">
                        <span className="pokemon-height font-face-gm">Height: {height/10} m</span>
                        <span className="pokemon-weight font-face-gm">Weight: {weight/10} kg</span>
                    </div>
                    {specie.length===0 ? (
                    <div className="pokemon-stats">
                        {stats.map(({base_stat,stat},index) => <>
                            <span>{stat.name}: {base_stat}</span>
                        </>)}
                    </div> ) : (
                        <div className="pokemon-stats" style={{backgroundColor: `${specie[0].color.name}`}}>
                        {stats.map(({base_stat,stat},index) => <>
                            <span>{stat.name}: {base_stat}</span>
                        </>)}
                    </div>
                    )}
                </> )}
           </div>
           </div>
           </div>
           <div className="pokemon-evolutions">
            evolutions
            </div>
        </div>
        {isLoaded ? null :<div>
            <div className="pokemon-item-not-loaded" style={{top:`${scrollPosition+120}px`}}></div>
            <div className="pokemon-item-not-loaded2"></div>
        </div>}
        </div>
    )
}

export default Pokemon