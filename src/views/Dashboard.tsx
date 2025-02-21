import { Select } from '../components/Select'
import { View } from '../styles/view'

const options = [
	{ value: 'option1', label: 'Opção 1' },
	{ value: 'option2', label: 'Opção 2' },
	{ value: 'option3', label: 'Opção 3' },
]

export function Dashboard() {
	return (
		<View>
			<Select options={options} onChange={() => {}} />
		</View>
	)
}
