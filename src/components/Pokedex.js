import '../styles/Pokedex.css'
import black from "../assets/pixelball.png"
import SoloDex from "./SoloDex"
import {useState, useEffect} from "react"
import Select from './Select';

function Pokedex() { 
    const [activePokemon, setActivePokemon] = useState("bulbasaur") 
    const [inputValue, setInputValue] = useState("")
    const [TypesList, setTypesList] = useState([])
    const [PokemonList, setPokemonList] = useState([])
    
  
    async function getPokemons() {
        const fet = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        const j = await fet.json()
        const k = await j.results
        setPokemonList(k)
    }
    useEffect(() => getPokemons(),[])

    async function getTypes() {
        let tab = []
        for (let i=1;i<=18;i+=1) {
            const fet = await fetch(`https://pokeapi.co/api/v2/type/${i}`)
            const j = await fet.json()
            await tab.push(j)
        }
        setTypesList(tab)
    }

    useEffect(() => getTypes(),[])
    
    const [activeType, setActiveType] = useState(TypesList)
    const [idSelected,setIdSelected] = useState("id")
    const [PokemonListSorted, setPokemonListSorted] = useState(PokemonList)
    useEffect(() => setPokemonListSorted(PokemonList.slice(0).sort((a,b) => a.name > b.name ? 1 : -1)),[PokemonList])

    //Debut du test scroll position

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    
    //Fin du test scroll position
    return (
        <div className="pokedex">
            <Select 
                inputValue={inputValue} 
                setInputValue={setInputValue} 
                TypesList={TypesList}
                activeType={activeType} 
                setActiveType={setActiveType} //OK
                idSelected={idSelected}
                setIdSelected={setIdSelected}
            />
            <div className="pokedex-pokemon-list">
                <ul> 
                    {idSelected==="id" ? (<> 
                    {PokemonList.map(({name, url}, index) => 
                        name.includes(inputValue) && 
                        activeType.map(({pokemon}) => pokemon.map(({pokemon}) => pokemon.name)).reduce((acc,liste) => acc.concat(liste),[]).includes(name)? (
                        <div key={index} className="font-face-gm" >
                            <li 
                                className={activePokemon===name ?"pokedex-pokemon-span-selected":"pokedex-pokemon-span"}
                                onClick={() => setActivePokemon(name)} 
                            >
                                <img src={black} alt="logo-black-pokeball" width="25" height="25"/>
                                <span className="name">{name}</span>
                            </li>
                        </div>) : null 
                    )} </>) : (<> 
                    {PokemonListSorted.map(({name, url}, index) => 
                        name.includes(inputValue) && 
                        activeType.map(({pokemon}) => pokemon.map(({pokemon}) => pokemon.name)).reduce((acc,liste) => acc.concat(liste),[]).includes(name)? (
                        <div key={index} className="font-face-gm" >
                            <li 
                                className={activePokemon===name ?"pokedex-pokemon-span-selected":"pokedex-pokemon-span"}
                                onClick={() => setActivePokemon(name)} 
                            >
                                <img src={black} alt="logo-black-pokeball" width="25" height="25"/>
                                <span className="name">{name}</span>
                            </li>
                        </div> ): null 
                        )} </>)}
                </ul>
            </div>
            <div className="pokedex-solodex">
                <SoloDex 
                    activePokemon={activePokemon}
                    setActivePokemon={setActivePokemon}
                    PokemonList={PokemonList}
                    scrollPosition={scrollPosition}
                />
            </div>
        </div>
    )
}

export default Pokedex
//onClick={() => name===activePokemon? (setActiveStyle("pokedex-pokemon-span-selected")):null}

//((activeType.map(({pokemon}) => pokemon.map(({name}) => name)))).reduce((acc,type) => acc.concat(type),[]).includes(name)