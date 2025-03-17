import type { ChangeEvent } from 'react'
import type { Property } from '../@types/property'

import { useCallback, useEffect, useState } from 'react'

import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { Input } from '../components/Input'
import { Modal } from '../components/Modal'

import { View, Container, Title, Label, Hr, Grid2, Space, Box } from '../styles/view'

import statesMapper from '../mappers/statesMapper'
import citiesMapper from '../mappers/citiesMapper'
import productorMapper from '../mappers/productorMapper'
import propertiesMapper from '../mappers/propertiesMapper'
import List from '../API/lists'
import Productors from '../API/productors'
import PropertiesAPI from '../API/properties'

import { calculate } from '../utils/calculate'

type TProductor = {
	name: string
	taxId: string
}

type TError = {
	name: string | null
	state: string | null
	city: string | null
	totalArea: string | null
	areableArea: string | null
	vegetationArea: string | null
	productor: string | null
}

const empty = {
	id: '',
	name: '',
	state: '',
	city: '',
	totalArea: 0,
	areableArea: 0,
	vegetationArea: 0,
	productorId: '',
}

export function Properties() {
	const [states, setStates] = useState([])
	const [cities, setCities] = useState([])
	const [productors, setProductors] = useState<{ value: string; label: string }[]>([])

	const [success, setSuccess] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [error, setError] = useState<TError>({
		name: null,
		state: null,
		city: null,
		totalArea: null,
		areableArea: null,
		vegetationArea: null,
		productor: null,
	})

	const [data, setData] = useState<Property>(empty)

	const loadCities = useCallback(async () => {
		try {
			if (data.state !== '') {
				const response = await List.getCities(data.state)
				setCities(response.map(citiesMapper.toDomain))
			}
		} catch (error) {
			console.log(error)
		}
	}, [data.state])

	const loadLists = useCallback(async () => {
		try {
			const productors: Record<string, TProductor> = await Productors.getProductors()

			setProductors(
				Object.entries(productors)
					.map(([id, obj]) => {
						return { id, ...obj }
					})
					.map(productorMapper.toList),
			)

			const response = await List.getStates()

			setStates(response.map(statesMapper.toDomain))
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		loadLists()
		loadCities()
	}, [loadLists, loadCities])

	const handleChange = (event: ChangeEvent<HTMLInputElement> | SelectEvent) => {
		setData({ ...data, [event.target.name]: event.target.value })
	}

	const saveData = () => {
		const errors: Record<string, string> = {}

		if (!data.name.trim()) {
			errors.name = 'Nome é obrigatório'
		}

		if (!data.state.trim()) {
			errors.state = 'Estado é obrigatório'
		}

		if (!data.city.trim()) {
			errors.city = 'Cidade é obrigatório'
		}

		if (data.totalArea <= 0) {
			errors.totalArea = 'É necessário aplicar um tamanho total a propriedade'
		}

		if (calculate(data.areableArea, data.vegetationArea, data.totalArea)) {
			errors.areableArea =
				'Os tamanhos de area vegetavel e agricultavel somadas deve ser menor ou igual a área total'
			errors.totalArea =
				'Os tamanhos de area vegetavel e agricultavel somadas deve ser menor ou igual a área total'
			errors.vegetationArea =
				'Os tamanhos de area vegetavel e agricultavel somadas deve ser menor ou igual a área total'
		}

		if (!data.productorId.trim()) {
			errors.productor = 'Propritário é obrigatório'
		}

		if (Object.keys(errors).length > 0) {
			setError(prevError => ({ ...prevError, ...errors }))
			return
		}

		try {
			PropertiesAPI.addProperties(propertiesMapper.toPersistence(data))
			setSuccess(true)
		} catch {
			setSuccess(false)
		} finally {
			setShowModal(true)
			setData(empty)
		}
	}

	return (
		<>
			<Modal success={success} show={showModal} setShow={setShowModal} />
			<View>
				<Container>
					<Title> Propriedades </Title>
					<Hr />

					<Label>Nome da Propriedade:</Label>
					<Input
						onChange={handleChange}
						name="name"
						error={error.name}
						clearError={() => setError({ ...error, name: null })}
						value={data.name}
					/>

					<Grid2>
						<Box>
							<Label>Estado</Label>
							<Select
								options={states}
								onChange={handleChange}
								name="state"
								clearError={() => setError({ ...error, state: null })}
								error={error.state}
								value={data.state}
							/>
						</Box>
						<Box>
							<Label>Cidade</Label>
							<Select
								options={cities}
								onChange={handleChange}
								name="city"
								disabled={!data.state}
								clearError={() => setError({ ...error, city: null })}
								error={error.city}
								value={data.city}
							/>
						</Box>
					</Grid2>

					<Label>Área Total (ha):</Label>
					<Input
						onChange={handleChange}
						type="number"
						name="totalArea"
						error={error.totalArea}
						clearError={() => setError({ ...error, totalArea: null })}
						value={data.totalArea}
					/>

					<Label>Área Agricutável (ha):</Label>
					<Input
						onChange={handleChange}
						type="number"
						name="areableArea"
						error={error.areableArea}
						clearError={() => setError({ ...error, areableArea: null })}
						value={data.areableArea}
					/>

					<Label>Área de Vegetação (ha):</Label>
					<Input
						onChange={handleChange}
						type="number"
						name="vegetationArea"
						error={error.vegetationArea}
						clearError={() => setError({ ...error, vegetationArea: null })}
						value={data.vegetationArea}
					/>

					<Label>Produtor</Label>
					<Select
						options={productors}
						onChange={handleChange}
						name="productorId"
						clearError={() => setError({ ...error, productor: null })}
						error={error.productor}
						value={data.productorId}
					/>
					<Space />
					<Space />
					<Button onClick={saveData}>Guardar</Button>
				</Container>
			</View>
		</>
	)
}
