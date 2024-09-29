import { useEffect, useState } from 'react'
import './root.css'

const logStyling = 'color: #d181ff; font-weight: bold;'

export default function Root(props) {
	const [robot, setRobot] = useState({ id: 1, name: 'Robot 1', planetId: 1 })
	useEffect(() => {
		console.log(`%cRender Robot: ${robot.name} with the following Props:\n`, logStyling, props)
		if (!props?.addRobots) return

		console.log(`%cRegister robot with ID ${robot.id} in Robot-Map-Container`, logStyling)
		props.addRobots([robot])
	}, [robot])

	const getPlanetsCount = () => 6

	function handleIdChange(e) {
		const newPlanetId = e.target.value
		const planetsCount = getPlanetsCount()
		const planetIdIsOutOfBounds = newPlanetId > planetsCount || newPlanetId < 1
		const planetIdIsOutOfBoundsMessage = `The choosen Planet ID is out of bounds, the max is: ${planetsCount} and the min 1`

		if (planetIdIsOutOfBounds) {
			alert(planetIdIsOutOfBoundsMessage)
			return
		}

		setRobot({ ...robot, planetId: newPlanetId })
		props.addRobots([robot])
	}
	return (
		<div className={`robot-container`}>
			<p className="robot-title">{robot.name} 🤖</p>
			<div className="robot-planet-selection">
				<input className="id-input" type="number" onChange={handleIdChange}  value={robot.planetId} />
				<label>PlanetId</label>
			</div>
		</div>
	)
}
