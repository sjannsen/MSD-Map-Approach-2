// import styles from './root.component.css'
import { useEffect, useRef, useState } from 'react'
import './root.css'
import { mountRootParcel, ParcelConfig } from 'single-spa'
export default function Root(props) {
	const [planets, setPlanets] = useState([])
	const [robots, setRobots] = useState([])

	const mapParcelRef = useRef(null)
	const robotParcelRef = useRef(null)

	useEffect(() => {
		console.log('Planets updated in React App 1')
		console.log({ planets })
	}, [planets])

	useEffect(() => {
		console.log('Robots updated in React App 1')
		console.log({ robots })
	}, [robots])

	useEffect(() => {
		let parcel
		async function loadParcel() {
			const parcelConfig: ParcelConfig<{ domElement: any; someProp: string }> = await System.import(
				'@MEA/React-MicroFrontend2',
			)

			parcel = mountRootParcel(parcelConfig, {
				domElement: mapParcelRef.current,
				someProp: 'someValue',
				// @ts-ignore
				addPlanets: setPlanets, // Sie können hier Props übergeben
			})
		}
		loadParcel()

		return () => {
			if (parcel) {
				parcel.unmount()
			}
		}
	}, [])

	useEffect(() => {
		let parcel
		async function loadParcel() {
			const parcelConfig: ParcelConfig<{ domElement: any; someProp: string }> = await System.import(
				'@MEA/Robot-MicroFrontend',
			)

			parcel = mountRootParcel(parcelConfig, {
				domElement: robotParcelRef.current,
				someProp: 'someValue',
				// @ts-ignore
				addRobots: setRobots, // Sie können hier Props übergeben
				positions: [{ id: 1, position: 'mid'}]
			})
		}
		loadParcel()

		return () => {
			if (parcel) {
				parcel.unmount()
			}
		}
	}, [])

	return (
		<div className={'container'}>
			<p>Hello from React App 1</p>
			<p>{props.name} is mounted!</p>

			<div className="App-2-Wrapper">
				<div ref={mapParcelRef}></div>
				<div ref={robotParcelRef}></div>
			</div>
		</div>
	)
}
