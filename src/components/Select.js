import '../styles/Select.css'
//import {useState, useEffect} from "react"

function Select({inputValue, setInputValue, TypesList, activeType, setActiveType}) {
	function handleInput(e) {
		setInputValue(e.target.value)
	}

    return (
        <div>
            	<input
                    placeholder='Recherchez un Pokemon'
                    onChange={handleInput}
                    value={inputValue}
			    />
        </div>
    )
}

export default Select