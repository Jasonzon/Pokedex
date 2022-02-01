import "../styles/Types.css"
import {useState} from "react"

function Types({TypeList, activeType, setActiveType}) {
    const checkTab = TypeList.map((type, index) => true) //tableau de bool

	const [isChecked, setIsChecked] = useState(checkTab)

	function addType(type, index) {
		setActiveType(activeType.concat([type]))
		const check1 = isChecked.map((che, index2) => index === index2 ? true : che)
		setIsChecked(check1)
	}

	function removeType(type, index) {
		const typeFiltered = activeType.filter(
			(typ) => typ !== type
		)
		setActiveType(typeFiltered)
		const check2 = isChecked.map((che, index2) => index === index2 ? false : che)
		setIsChecked(check2)
	}

	return (
		<div className='select-types'>
			<ul>
				{TypeList.map((type,index) => (
					<div key={`${type}-${index}`}>
						{type}
						{isChecked[index] ? <input 
						type="checkbox" 
						className="type-checkbox" 
						onClick={() => removeType(type, index)} checked></input> :
						<input 
						type="checkbox" 
						className="type-checkbox" 
						onClick={() => addType(type, index)}></input> }
					</div>
				))}
			</ul>
			<button onClick={() => setActiveType(TypeList)}>Réinitialiser</button>
		</div>
	)
}

export default Types