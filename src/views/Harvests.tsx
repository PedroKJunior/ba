import { ChangeEvent, useState } from 'react'

import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { Input } from '../components/Input'

import { View, Container, Title, Label, Hr, Space } from '../styles/view'

const options = [
	{ value: 'option1', label: 'Opção 1' },
	{ value: 'option2', label: 'Opção 2' },
	{ value: 'option3', label: 'Opção 3' },
]

interface Crop {
	harvestYear: string
	cropType: string
	farm: string
}

export function Harvests() {
	const [data, setData] = useState<Crop>({
		harvestYear: '',
		cropType: '',
		farm: '',
	})

	const handle = (event: ChangeEvent<HTMLInputElement> | SelectEvent) => {
		setData(prevData => ({
			...prevData,
			[event.target.name]: event.target.value || '',
		}))
	}

	return (
		<View>
			<Container>
				<Title> Safras </Title>
				<Hr />

				<Label>Ano da Safra:</Label>
				<Input onChange={handle} name="harvestYear" value={data.harvestYear} />

				<Label>Cultura da Safra:</Label>
				<Input onChange={handle} name="cropType" value={data.cropType} />

				<Label>Propriedade Rural</Label>
				<Select options={options} onChange={handle} name="farm" />

				<Space />
				<Space />
				<Button>Guardar</Button>
			</Container>
		</View>
	)
}
