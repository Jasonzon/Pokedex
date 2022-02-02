import Banner from './Banner';
import Select from './Select';
import Pokedex from './Pokedex';
import {useState, useEffect} from "react"
import "../styles/App.css"

function App() {
  const [inputValue, setInputValue] = useState("") //modif a chaque fois qu'on écrit dans l'input (donc re-render tous les poke)
  const [TypesList, setTypesList] = useState([]) //jamais modifié
  const [PokemonList, setPokemonList] = useState([]) //jamais modifié
  const [activeType, setActiveType] = useState(TypesList) //modif quand on coche les types à rechercher

  async function getPokemons() {
      const fet = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25")
      const j = await fet.json()
      const k = await j.results
      setPokemonList(k)
  }
  useEffect(() => getPokemons(),[])

  async function getTypes() {
    const fet = await fetch("https://pokeapi.co/api/v2/type")
    const j = await fet.json()
    const k = await j.results
    setTypesList(k);
  }
  useEffect(() => getTypes(),[])

  return (
    <div>
      <Banner />
      <Select 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        TypesList={TypesList}
        activeType={activeType} 
        setActiveType={setActiveType} //OK
      />
      <Pokedex 
        inputValue={inputValue} 
        activeType={activeType} 
        PokemonList={PokemonList}
      />
    </div>
  )
}

export default App;

/*
let song = new Audio(my_song);
song.play();
song.pause();*/