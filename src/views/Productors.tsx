import type { ChangeEvent } from 'react'
import type { Productor } from '../@types/productor'

import { useState } from 'react'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Modal } from '../components/Modal'
import { View, Container, Title, Label, Hr, Space } from '../styles/view'

import { formatTax } from '../utils/mask'
import Validate from '../utils/validateTax'

import ProductorsAPI from '../API/productors'
import productorMapper from '../mappers/productorMapper'

type TError = {
	name: string | null
	taxId: string | null
}
const empty: Productor = {
	id: '',
	name: '',
	taxId: '',
}

export function Productors() {
	const [data, setData] = useState<Productor>(empty)

	const [success, setSuccess] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [error, setError] = useState<TError>({
		name: null,
		taxId: null,
	})

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [event.target.name]: event.target.value })
	}

	const saveData = async () => {
		const errors: Record<string, string> = {}

		if (!data.name.trim()) {
			errors.name = 'Nome é obrigatório'
		}

		if (!data.taxId.trim()) {
			errors.taxId = 'Tax ID é obrigatório'
		}

		const isValidTax = Validate.validateTax(data.taxId)

		if (Object.keys(errors).length > 0) {
			setError(prevError => ({ ...prevError, ...errors }))
			return
		}

		if (!isValidTax) {
			setError(prevError => ({
				...prevError,
				taxId: 'Tax ID inválido',
			}))
			return
		}

		try {
			ProductorsAPI.addProductors(productorMapper.toPersistence(data))
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
					<Title> Proprietários </Title>
					<Hr />

					<Label>Nome:</Label>
					<Input
						onChange={handleChange}
						name="name"
						error={error.name}
						clearError={() => setError({ ...error, name: null })}
						value={data.name}
					/>

					<Label>CPF/CNPJ:</Label>
					<Input
						onChange={handleChange}
						name="taxId"
						value={formatTax(data.taxId)}
						error={error.taxId}
						clearError={() => setError({ ...error, taxId: null })}
					/>

					<Space />
					<Space />
					<Button onClick={saveData}>Guardar</Button>
				</Container>
			</View>
		</>
	)
}
