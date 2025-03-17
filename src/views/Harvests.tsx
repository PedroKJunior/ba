import { useState, useCallback, useEffect } from 'react'

import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { Input } from '../components/Input'
import { Modal } from '../components/Modal'
import { View, Container, Title, Label, Hr, Space } from '../styles/view'

import HarvestsAPI from '../API/harvests'
import Properties from '../API/properties'
import propertiesMapper from '../mappers/propertiesMapper'
import harvestsMapper from '../mappers/harvestsMapper'

import type { ChangeEvent } from 'react'
import type { IHarvests } from '../@types/harvests.ts'

type TProperty = {
	name: string
	city: string
	state: string
	totalArea: number
	areableArea: number
	vegetationArea: number
	productorId: string
}

type TError = {
	harvestYear: string | null
	cropType: string | null
	property: string | null
}

const empty = { id: '', harvestYear: '2025', cropType: '', property: '' }

export function Harvests() {
	const [data, setData] = useState<IHarvests>(empty)
	const [success, setSuccess] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [error, setError] = useState<TError>({
		harvestYear: null,
		cropType: null,
		property: null,
	})

	const [properties, setProperties] = useState<{ value: string; label: string }[]>([])

	const loadLists = useCallback(async () => {
		try {
			const response: Record<string, TProperty> = await Properties.getProperties()
			setProperties(
				Object.entries(response)
					.map(([id, obj]) => {
						return { id, ...obj }
					})
					.map(propertiesMapper.toList),
			)
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		loadLists()
	}, [loadLists])

	const handle = (event: ChangeEvent<HTMLInputElement> | SelectEvent) => {
		setData(prevData => ({
			...prevData,
			[event.target.name]: event.target.value || '',
		}))
	}

	const saveData = () => {
		const errors: Record<string, string> = {}

		if (!data.harvestYear.trim()) {
			errors.harvestYear = 'O Ano da safra obrigatório'
		}

		if (!data.cropType.trim()) {
			errors.cropType = 'A safra é obrigatória'
		}

		if (!data.property.trim()) {
			errors.property = 'A propriedade obrigatória'
		}

		if (Object.keys(errors).length > 0) {
			setError(prevError => ({ ...prevError, ...errors }))
			return
		}

		try {
			HarvestsAPI.addHarvests(harvestsMapper.toPersistence(data))
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
					<Title> Safras </Title>
					<Hr />

					<Label>Ano da Safra:</Label>
					<Input
						type="number"
						onChange={handle}
						name="harvestYear"
						value={data.harvestYear}
						error={error.harvestYear}
						clearError={() => setError({ ...error, harvestYear: null })}
					/>

					<Label>Cultura da Safra:</Label>
					<Input
						onChange={handle}
						name="cropType"
						value={data.cropType}
						error={error.cropType}
						clearError={() => setError({ ...error, cropType: null })}
					/>

					<Label>Propriedade Rural</Label>
					<Select
						options={properties}
						onChange={handle}
						name="property"
						error={error.property}
						value={data.property}
						clearError={() => setError({ ...error, property: null })}
					/>

					<Space />
					<Space />
					<Button onClick={saveData}>Guardar</Button>
				</Container>
			</View>
		</>
	)
}
