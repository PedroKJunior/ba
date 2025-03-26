import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchHarvests } from '../redux/harvestsSlice'
import { fetchProperties } from '../redux/propertiesSlice'

import { Title, Text, SVG, View, Grid2, Grid, Small, Loading } from '../styles/dashboard'

import { PiFarm, PiPlantFill } from 'react-icons/pi'

import { Card } from '../components/Card'
import { Chart } from '../components/Chart'

import { grouped, sumGroupedAreas } from '../utils/grouped'

import type { RootState, AppDispatch } from '../redux/store'

export function Dashboard() {
	const dispatch = useDispatch<AppDispatch>()
	const harvests = useSelector((state: RootState) => state.harvests.data)
	const properties = useSelector((state: RootState) => state.properties.data)
	const loadingHarvests = useSelector((state: RootState) => state.harvests.loading)
	const loadingProperties = useSelector((state: RootState) => state.properties.loading)

	useEffect(() => {
		dispatch(fetchHarvests())
		dispatch(fetchProperties())
	}, [dispatch])

	if (loadingHarvests || loadingProperties)
		return (
			<View>
				<Loading>Carregando...</Loading>
			</View>
		)

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
						Total de hectares registrados<Small>(em ha)</Small>
						<Text>{properties.reduce((sum, property) => sum + Number(property.totalArea), 0)}</Text>
					</Title>
				</Card>
				<Chart title="Estado" data={grouped(properties, 'state')} />
				<Chart title="Cultura" data={grouped(harvests, 'cropType')} />
			</Grid2>
			<Grid>
				<Chart title="Uso do Solo (ha)" data={sumGroupedAreas(properties)} />
			</Grid>
		</View>
	)
}
