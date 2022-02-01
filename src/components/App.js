import Banner from './Banner';
import Select from './Select';
import Pokedex from './Pokedex';
import {useState} from "react"
import SoloDex from './SoloDex';

function App() {
  const [inputValue, setInputValue] = useState("")
  const [TypesList, setTypesList] = useState([])

  const [activeType, setActiveType] = useState(TypesList)
  async function getTypes() {
    const fet = await fetch("https://pokeapi.co/api/v2/type")
    const j = await fet.json()
    const k = await j.results
    setTypesList(k);
  }
  getTypes()

  return (
    <div>
      <Banner />
      <Select 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        TypesList={TypesList}
        activeType={activeType} 
        setActiveType={setActiveType}
      />
      <Pokedex 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        TypesList={TypesList}
        activeType={activeType} 
        setActiveType={setActiveType}
      />
      <SoloDex 
      
      />
    </div>
  )
}

export default App;
