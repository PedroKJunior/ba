import { useCallback, useEffect, useState } from 'react'

import { Title, Text, SVG, View, Grid2, Grid, Small } from '../styles/dashboard'

import { PiFarm, PiPlantFill } from 'react-icons/pi'

import { Card } from '../components/Card'
import { Chart } from '../components/Chart'

import HarvestsAPI from '../API/harvests'
import PropertiesAPI from '../API/properties'

import propertiesMapper from '../mappers/propertiesMapper'
import harvestsMapper from '../mappers/harvestsMapper'

import { IHarvests } from '../@types/harvests'
import { Property } from '../@types/property'

import { grouped, sumGroupedAreas } from '../utils/grouped'

export function Dashboard() {
	const [harvests, setHarvest] = useState<IHarvests[]>([])
	const [properties, setProperties] = useState<Property[]>([])

	const loadData = useCallback(async () => {
		const harvestsResponse: Promise<Record<string, IHarvests>> = await HarvestsAPI.getHarvests()
		const propertiesResponse: Promise<Record<string, Property>> = await PropertiesAPI.getProperties()

		setHarvest(
			Object.entries(harvestsResponse)
				.map(([id, obj]) => {
					return { id, ...obj }
				})
				.map(harvestsMapper.toDomain),
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
				<Chart title="Estado" data={grouped(properties, 'state')} />
				<Chart title="Cultura" data={grouped(harvests, 'cropType')} />
			</Grid2>
			<Grid>
				<Chart title="Uso do Solo (hc)" data={sumGroupedAreas(properties)} />
			</Grid>
		</View>
	)
}
