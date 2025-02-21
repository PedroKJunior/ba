import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { View, Container, Title, Label, Hr, Space } from '../styles/view'

export function Owners() {
	const handle = (e: any) => {
		console.log(e)
	}

	return (
		<View>
			<Container>
				<Title> Proprietários </Title>
				<Hr />

				<Label>Nome:</Label>
				<Input onChange={handle} />

				<Label>CPF/CNPJ:</Label>
				<Input onChange={handle} />

				<Space />
				<Space />
				<Button>Guardar</Button>
			</Container>
		</View>
	)
}
