import { useEffect } from 'react'
import './root.css'

const planets = [
	{ id: 1, name: 'Planet 1', position: 'top-left' },
	{ id: 2, name: 'Planet 2', position: 'top-center' },
	{ id: 3, name: 'Planet 3', position: 'top-right' },
	{ id: 4, name: 'Planet 4', position: 'mid-left' },
	{ id: 5, name: 'Planet 5', position: 'mid-center' },
	{ id: 6, name: 'Planet 6', position: 'bottom-right' },
]

const logStyling = 'color: #26bfa5; font-weight: bold;'
const renderMessage = '%cRender Planet App with the following props:\n'
const registrationMessage = '%cRegister planets in Robot-Map-Container'

export default function Root(props) {
	useEffect(() => {
		console.log(renderMessage, logStyling, props)
		if (!props?.addPlanets) return

		console.log(registrationMessage, logStyling)
		props.addPlanets(planets)
	}, [planets])

	const renderPlanets = () =>
		planets.map((planet) => (
			<div key={planet.id} className={`planet ${planet.position}`}>
				{planet.name}
			</div>
		))

	return (
		<div className="map-container">
			<div className="planets-container">{renderPlanets()}</div>
		</div>
	)
}
