import '../styles/Select.css'
//import {useState, useEffect} from "react"
import Types from "./Types"
import {useState} from "react"

function Select({inputValue, setInputValue, TypesList, activeType, setActiveType,idSelected,setIdSelected}) {
	function handleInput(e) {
		setInputValue(e.target.value)
	}

    return (
        <div className="select">
            <input
                placeholder='Recherchez un Pokemon'
                onChange={handleInput}
                value={inputValue}
			/>
            <select className="select-select" value={idSelected} onChange={((event) => setIdSelected(event.target.value))}>
                <option value="id">Sort by id</option>
                <option value="name">Sort by name</option>
            </select>
           <Types
				TypesList={TypesList}
				setActiveType={setActiveType}
				activeType={activeType}
			/>
        </div>
    )
}

export default Select