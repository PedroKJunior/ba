import { useCallback, useEffect, useState } from 'react'

import { View } from '../styles/view'
import { Title, Text, SVG, Grid2, Small } from '../styles/dashboard'

import { PiFarm, PiPlantFill } from 'react-icons/pi'

import { Card } from '../components/Card'

import ProductorsAPI from '../API/productors'
import HarvestsAPI from '../API/harvests'
import PropertiesAPI from '../API/properties'

import productorMapper from '../mappers/productorMapper'
import propertiesMapper from '../mappers/propertiesMapper'
import harvestsMapper from '../mappers/harvestsMapper'

import { IHarvests, IHarvestsDB } from '../@types/harvests'
import { Productor, ProductorDB } from '../@types/productor'
import { Property, PropertyDB } from '../@types/property'

export function Dashboard() {
	const [harvests, setHarvest] = useState<IHarvests[]>([])
	const [productor, setProductors] = useState<Productor[]>([])
	const [properties, setProperties] = useState<Property[]>([])

	const loadData = useCallback(async () => {
		const harvestsResponse: Promise<Record<string, IHarvests>> = HarvestsAPI.getHarvests()
		const productorsResponse: Promise<Record<string, Productor>> = ProductorsAPI.getProductors()
		const propertiesResponse: Promise<Record<string, Property>> = await PropertiesAPI.getProperties()

		setHarvest(
			Object.entries(harvestsResponse)
				.map(([id, obj]) => {
					return { id, ...obj }
				})
				.map(harvestsMapper.toDomain),
		)
		setProductors(
			Object.entries(productorsResponse)
				.map(([id, obj]) => {
					return { id, ...obj }
				})
				.map(productorMapper.toDomain),
		)
		setProperties(
			Object.entries(propertiesResponse)
				.map(([id, obj]) => {
					return { id, ...obj }
				})
				.map(propertiesMapper.toDomain),
		)
	}, [])

	useEffect(() => {
		console.log(properties)
	}, [properties])

	useEffect(() => {
		loadData()
	}, [loadData])

	return (
		<View>
			<Grid2>
				<Card>
					<Title>
						<SVG>
							<PiFarm />
						</SVG>
						Total de fazendas cadastradas
						<Text>{properties.length}</Text>
					</Title>
				</Card>
				<Card>
					<Title>
						<SVG>
							<PiPlantFill />
						</SVG>
						Total de hectares registrados<Small>(em hc)</Small>
						<Text>{properties.reduce((sum, property) => sum + Number(property.totalArea), 0)}</Text>
					</Title>
				</Card>
			</Grid2>
		</View>
	)
}
