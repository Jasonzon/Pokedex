import "../styles/Types.css"
import {useState, useEffect} from "react"

function Types({TypesList, activeType, setActiveType}) {
    const checkTab = TypesList.map((type, index) => true) //tableau de bool
	const [isChecked, setIsChecked] = useState(checkTab)
	useEffect(() => setIsChecked(checkTab),[TypesList])
	useEffect(() => setActiveType(TypesList),[TypesList])

	function addType(type, index) {
		setActiveType(activeType.concat([type]))
		const check1 = isChecked.map((che, index2) => index === index2 ? true : che)
		setIsChecked(check1)
	}

	function removeType(type, index) {
		const typeFiltered = activeType.filter(
			(typ) => typ.name !== type.name
		)
		setActiveType(typeFiltered)
		const check2 = isChecked.map((che, index2) => index === index2 ? false : che)
		setIsChecked(check2)
	}

	function removeAll() {
		setActiveType([])
		setIsChecked(TypesList.map((type) => false))
	}

	function addAll() {
		setActiveType(TypesList)
		setIsChecked(TypesList.map((type) => true))
	}



	return (
		<div className='select-types'>
			<div className="type-input">
				<button onClick={() => addAll()}>Select All</button>
				<button onClick={() => removeAll()}>Select zero</button>
			</div>
			<ul className="type-list">
				{TypesList.map(({name,pokemon},index) => (
					<li>
						<div className="type-flex" key={`${name}-${index}`}>
							<span className={`type-label pokemon-type-${name}`}>{name}</span>
							{isChecked[index] ? <input 
							type="checkbox" 
							className="type-checkbox" 
							name="check1-"
							value="check1"
							onChange={() => removeType(TypesList[index],index)} checked={true}></input> :
							<input 
							type="checkbox" 
							className="type-checkbox" 
							value="check2"
							name="check2-"
							onChange={() => addType(TypesList[index],index)} checked={false}></input> }
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Types