import '../styles/Pokemon.css'
import PokemonTypes from "./PokemonTypes"
import {useState, useEffect} from "react"
import stop from "../assets/stop.png"
import arrow_left from "../assets/arrow_left.png"
import arrow_right from "../assets/arrow_right.png"

function Pokemon({name, url, scrollPosition, setActivePokemon}) {
    const [ThePokemon, setThePokemon] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoaded2, setIsLoaded2] = useState(false)
    const [isLoaded3, setIsLoaded3] = useState(false)
    const [isLoaded4, setIsLoaded4] = useState(false)
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

    const [evolutions, setEvolutions] = useState([])
    const [mega, setMega] = useState([])
    const [regional, setRegional] = useState([])
    const [actualMega, setActualMega] = useState()
    const [actualEvolution, setActualEvolution] = useState([])
    const [actualRegional, setActualRegional] = useState()

    async function getEvolutions() {
        if (specie.length !== 0) {
            let tab = []
            let nb_evo = 0
            const fet = await fetch(specie[0].evolution_chain.url)
            const j = await fet.json()
            let k = await j.chain 
            if (k.species.name === name) {
                if (k.evolves_to.length !== 0) {
                    for (let i in k.evolves_to) {
                        nb_evo++
                        const fet2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${k.evolves_to[i].species.name}`)
                        const j2 = await fet2.json()
                        await tab.push(j2)
                        
                    }
                }
                setEvolutions(tab) //tableau de names
                if (nb_evo !== 0) {
                    await setActualEvolution(tab)
                }
                else {
                    await setActualEvolution([stop])
                }
            }
            else {
                if (k.evolves_to[0].evolves_to.length !== 0 && k.evolves_to[0].species.name === name) {
                    for (let i in k.evolves_to[0].evolves_to) {
                        nb_evo++
                        const fet2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${k.evolves_to[0].evolves_to[i].species.name}`)
                        const j2 = await fet2.json()
                        await tab.push(j2)
                    }
                }
                setEvolutions(tab) //tableau de names   
                if (nb_evo !== 0) {
                    await setActualEvolution(tab)
                }
                else {
                    await setActualEvolution([stop])
                }
            }
            
        }
    }
    useEffect(() => getEvolutions(),[specie])

    async function getForms() {
        if (specie.length !== 0) {
            let tab_mega = []
            let tab_regional = []
            let nb_mega = 0
            let nb_form = 0
            for (let i in specie[0].varieties) {
                if (specie[0].varieties[i].pokemon.name.includes("mega")) {
                    nb_mega++
                    const fet = await fetch(specie[0].varieties[i].pokemon.url)
                    const j = await fet.json()
                    await tab_mega.push(j.sprites.other["official-artwork"].front_default)
                    
                }
                else{
                    if (specie[0].varieties[i].pokemon.name !== name && specie[0].varieties[i].pokemon.name !== "pikachu-cosplay") {
                        nb_form++
                        const fet = await fetch(specie[0].varieties[i].pokemon.url)
                        const j = await fet.json()
                        await tab_regional.push(j.sprites.other["official-artwork"].front_default)
                    }
                } 
            }
            setMega(tab_mega)
            setRegional(tab_regional)
            if (nb_mega !== 0) {
                await setActualMega(tab_mega[0])
            }
            else {
                await setActualMega(stop)
            }
            if (nb_form !== 0) {
                await setActualRegional(tab_regional[0])
            }
            else {
                await setActualRegional(stop)
            }
        }
    }
    useEffect(() => getForms(),[specie])
    
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
                {specie.map(({flavor_text_entries,genera,habitat,is_baby,is_legendary,is_mythical,shape}) => <>
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
            <div className="pokemon-forms font-face-gm">
                <div className="evolutions">
                    <span className="evolve-span">evolutions</span>
                    {actualEvolution.length !== 0 && actualEvolution[0] !== stop ?
                    <img className='evolve-image' src={actualEvolution[0].sprites.other["official-artwork"].front_default} alt="evolution" 
                        width="170" height="170" onLoad={() => setIsLoaded2(true)} onClick={() => actualEvolution[0] === stop ? null : setActivePokemon(actualEvolution[0].name)}/> :
                    <img src={actualEvolution[0]} alt="no pokemon" 
                    width="170" height="170" onLoad={() => setIsLoaded2(true)}/> }
                    {actualEvolution.length === 0 || actualEvolution[0] === stop ? null :
                    <div className="evolve-div">
                        {evolutions.length !== 0 && actualEvolution[0] !== evolutions[0] ?
                        <img className="arrow-left" src={arrow_left} alt="left arrow" width="25" height="25" onClick={() => setActualEvolution([evolutions.find((element,index) => evolutions[index+1] === actualEvolution[0])])}/> :
                        <img className="arrow-left-disabled" src={arrow_left} alt="left arrow" width="25" height="25"/> }
                        {evolutions.length !== 0 && actualEvolution[0] !== evolutions[evolutions.length-1] ?
                        <img className="arrow-right" src={arrow_right} alt="right arrow" width="25" height="25" onClick={() => setActualEvolution([evolutions.find((element,index) => evolutions[index-1] === actualEvolution[0])])}/> :
                        <img className="arrow-right-disabled" src={arrow_right} alt="right arrow" width="25" height="25"/> }
                    </div> }
                </div>
                <div className="mega">
                    <span className="mega-span">mega</span>
                    <img className='mega-image' src={actualMega} alt="mega" 
                        width="170" height="170" onLoad={() => setIsLoaded3(true)}/> 
                    {actualMega === stop ? null :
                    <div className="mega-div">
                        {mega.length !== 0 && actualMega !== mega[0] ?
                        <img className="arrow-left" src={arrow_left} alt="left arrow" width="25" height="25" onClick={() => setActualMega(mega.find((element,index) => mega[index+1] === actualMega))}/> :
                        <img className="arrow-left-disabled" src={arrow_left} alt="left arrow" width="25" height="25"/> }
                        {mega.length !== 0 && actualMega !== mega[mega.length-1] ?
                        <img className="arrow-right" src={arrow_right} alt="right arrow" width="25" height="25" onClick={() => setActualMega(mega.find((element,index) => mega[index-1] === actualMega))}/> :
                        <img className="arrow-right-disabled" src={arrow_right} alt="right arrow" width="25" height="25"/> }
                    </div> }
                </div>
                <div className="regional">
                    <span className="forms-span">forms</span>
                    <img className='form-image' src={actualRegional} alt="form" 
                    width="170" height="170" onLoad={() => setIsLoaded4(true)}/> 
                    {actualRegional === stop ? null :
                    <div className="form-div"> 
                        {regional.length !== 0 && actualRegional !== regional[0] ? 
                        <img className="arrow-left" src={arrow_left} alt="left arrow" width="25" height="25" onClick={() => setActualRegional(regional.find((element,index) => regional[index+1] === actualRegional))}/> :
                        <img className="arrow-left-disabled" src={arrow_left} alt="left arrow" width="25" height="25"/> }
                        {regional.length !== 0 && actualRegional !== regional[regional.length-1] ?
                        <img className="arrow-right" src={arrow_right} alt="right arrow" width="25" height="25" onClick={() => setActualRegional(regional.find((element,index) => regional[index-1] === actualRegional))}/> :
                        <img className="arrow-right-disabled" src={arrow_right} alt="right arrow" width="25" height="25"/> }
                    </div> }
                </div>
            </div>
        </div>
        {isLoaded && isLoaded2 && isLoaded3 && isLoaded4 ? null :<div>
            <div className="pokemon-item-not-loaded" style={{top:`${scrollPosition+120}px`}}></div>
            <div className="pokemon-item-not-loaded2"></div>
        </div>}
        </div>
    )
}

export default Pokemon

