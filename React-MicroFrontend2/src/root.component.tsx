import { useEffect } from 'react';
import './root.css'

export default function Root(props) {

	const planets = [{id: 1, name: 'Planet 1'}]
	useEffect(() => {
		console.log('Render React App 2')
		console.log({props})

		if (props?.addPlanets) {
			console.log('Add planets')
			props.addPlanets(planets)
		}
		console.log('No add planets')

	}, [planets]);

	return (
		<div className="map-container">
			<p>Hello from Map App 2</p>
			<p>{props.name} is mounted!</p>
		</div>
	)
}
