import { useEffect, useRef, useState } from 'react'
import './root.css'
import { mountRootParcel, Parcel, ParcelConfig } from 'single-spa'

const logStyling = 'color: #dff89c; font-weight: bold;'
const planetsUpdatedMessage = '%cPlanets updated Map-Micro-Frontend and lead to Re-Render Robot-Map-Container'
const robotsUpdatedMessage = '%cRobots updated in Robot-Micro-Frontend and let to Re-Render Robot-Map-Container'
const planetsIsNotArrayOrUndefinedMessage = '%cPlanets is not an array or is undefined'

export default function Root(props) {
	const [planets, setPlanets] = useState([])
	const [robots, setRobots] = useState([])

	const mapParcelRef = useRef(null)
	const robotParcelRef = useRef(null)

	const [renderRobots, setRenderRobots] = useState(true)

	useEffect(() => {
		console.log(planetsUpdatedMessage, logStyling)
	}, [planets])

	useEffect(() => {
		console.log(robotsUpdatedMessage, logStyling)
	}, [robots])

	let mapParcel: Parcel | null = null
	useEffect(() => {
		async function loadParcel() {
			const mapParcelConfig: ParcelConfig<{ domElement: any }> = await System.import(
				'@MEA/Map-Micro-Frontend',
			)

			mapParcel = mountRootParcel(mapParcelConfig, {
				domElement: mapParcelRef.current,
				// @ts-ignore
				addPlanets: setPlanets,
			})
		}
		loadParcel()

		return () => {
			if (mapParcel) mapParcel.unmount()
		}
	}, [])

	let robotParcel: Parcel | null = null
	useEffect(() => {
		async function loadParcel() {
			const parcelConfig: ParcelConfig<{ domElement: any }> = await System.import(
				'@MEA/Robot-Micro-Frontend',
			)

			robotParcel = mountRootParcel(parcelConfig, {
				domElement: robotParcelRef.current,
				// @ts-ignore
				addRobots: setRobots,
				positions: { id: 1, position: 'mid-center' },
			})
		}
		if (renderRobots ) loadParcel()

		return () => {
			if (robotParcel) robotParcel.unmount()
		}
	}, [renderRobots])

	const getPositionOfPlanetByPlanetId = (id: number) => {
		if (!Array.isArray(planets)) {
			console.error(planetsIsNotArrayOrUndefinedMessage, logStyling)
			return undefined
		}
		const planetId = robots?.[0]?.planetId || undefined
		const planet = planets.find((planet) =>  planet.id == planetId)

		// That planetId or planet is undefined happens because of the mounting process
		// 1. Mount Map-Robot-Container
		// 2. Initialize robots & planets with empty []
		// 3. Mount Map-App & Robot-App
		// 4. Initialize planets and robots with actual values
		// TODO: This is a workaround, but a real solution is needed
		if (!planet) {
			const noPlanetFoundMessage = `%cNo planet found with id: ${id}`
			console.error(noPlanetFoundMessage, logStyling)
			return undefined
		}

		return planet.position
	}

	return (
		<div className={'container'}>
			<h1>Map-Robot Container</h1>
			<div className="map-robot-wrapper">
				<div className="map-parcel" ref={mapParcelRef}></div>
				{renderRobots && (
					<div className="robot-orchestration-container">
						<div className={getPositionOfPlanetByPlanetId(robots.length > 0 ? robots[0].planetId : 1)} ref={robotParcelRef}></div>
					</div>
				)}
			</div>
			<div className="display-options-container">
				<input
					type="checkbox"
					name="show robots"
					value={'show robots value'}
					defaultChecked
					onChange={() => setRenderRobots(!renderRobots)}
				/>
				<label>Show robots</label>
			</div>
		</div>
	)
}
