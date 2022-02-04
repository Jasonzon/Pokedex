import '../styles/Select.css'
//import {useState, useEffect} from "react"
import Types from "./Types"

function Select({inputValue, setInputValue, TypesList, activeType, setActiveType}) {
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
           <Types
				TypesList={TypesList}
				setActiveType={setActiveType}
				activeType={activeType}
			/>
        </div>
    )
}

export default Select