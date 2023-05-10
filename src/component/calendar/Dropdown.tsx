import '../../style/dropdown.css'
import { useState } from 'react'

export default function Dropdown({ selected, setSelected, options, changeMonth }: any) {

	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<div className='dropdown-calendar'>
			<div className="dropdown-btn-calendar" onClick={e => setIsActive(!isActive)}>{selected}</div>
			{isActive && (
				<div className="dropdown-content-calendar" onClick={(e) => changeMonth(e)}>
					{options.map((option: any) => (
						<div
							key={JSON.stringify(option.time)}
							className="dropdown-item-calendar"
							onClick={e => { 
								setSelected(option)
								setIsActive(false)
							}}>
								{option}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
