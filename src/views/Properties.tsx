import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { Input } from '../components/Input'
import { View, Container, Title, Label, Hr, Grid2, Space, Box } from '../styles/view'

const options = [
	{ value: 'option1', label: 'Opção 1' },
	{ value: 'option2', label: 'Opção 2' },
	{ value: 'option3', label: 'Opção 3' },
]

export function Properties() {
	const handle = (e: any) => {
		console.log(e)
	}

	return (
		<View>
			<Container>
				<Title> Propriedades </Title>
				<Hr />

				<Label>Nome da Propriedade:</Label>
				<Input onChange={handle} />

				<Grid2>
					<Box>
						<Label>Cidade</Label>
						<Select options={options} onChange={handle} />
					</Box>
					<Box>
						<Label>Estado</Label>
						<Select options={options} onChange={handle} />
					</Box>
				</Grid2>

				<Label>Área Total:</Label>
				<Input onChange={handle} />

				<Label>Área Agricutável</Label>
				<Input onChange={handle} />

				<Label>Área de Vegetação</Label>
				<Input onChange={handle} />

				<Label>Proprietário</Label>
				<Select options={options} onChange={handle} />

				<Space />
				<Space />
				<Button>Guardar</Button>
			</Container>
		</View>
	)
}
