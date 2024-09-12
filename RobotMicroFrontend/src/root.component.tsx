import { useEffect } from 'react'
import './root.css'

export default function Root(props) {
	const robots = [{ id: 1, name: 'Robot 1', planetId: 1 }]
	useEffect(() => {
		console.log('Render Robot App ')
		console.log({ props })

		if (props?.addRobots) {
			console.log('Add robots')
			props.addRobots(robots)
		}
		console.log('No add robots')
	}, [robots])

	return (
		<div className="robot-container">
			<p>Hello from Robot App</p>
			<p>{props.name} is mounted!</p>

			<div className='robot-grid'>
				{props.positions.map(position => (
					<div key={position.id} className={position?.position}>{position.id}</div>)
				)}
			</div>
		</div>
	)
}
