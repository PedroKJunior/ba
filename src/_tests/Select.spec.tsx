import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from '../components/Select'

const options = [
	{ value: 'option1', label: 'Opção 1' },
	{ value: 'option2', label: 'Opção 2' },
	{ value: 'option3', label: 'Opção 3' },
]

describe('Select Component', () => {
	test('renderiza corretamente com placeholder', () => {
		render(<Select options={options} onChange={jest.fn()} clearError={function (): void {}} />)

		expect(screen.getByText('Selecione uma opção')).toBeInTheDocument()
	})

	test('exibe a mensagem de erro corretamente', () => {
		render(<Select options={options} onChange={() => {}} error="Campo obrigatório" clearError={() => {}} />)

		const errorMessage = screen.getByText('Campo obrigatório')
		expect(errorMessage).toBeInTheDocument()
		expect(errorMessage).toHaveStyle('color: #e20031')
	})

	test('exibe a borda vermelha quando há erro', () => {
		render(<Select options={options} onChange={() => {}} error="Campo obrigatório" clearError={() => {}} />)

		const selectBox = screen.getByTestId('select-box')
		expect(selectBox).toHaveStyle('border: 1px solid #e20031')
	})

	test('abre e fecha o menu corretamente', () => {
		render(<Select options={options} onChange={jest.fn()} clearError={function (): void {}} />)

		const menu = screen.getByRole('list')

		expect(menu).toHaveStyle('opacity: 0')
		expect(menu).toHaveStyle('transform: translateY(-10px)')

		const selectBox = screen.getByText('Selecione uma opção')

		fireEvent.click(selectBox)
		expect(menu).toHaveStyle('opacity: 1')
		expect(menu).toHaveStyle('transform: translateY(0)')

		fireEvent.mouseDown(document.body)

		expect(menu).toHaveStyle('opacity: 0')
		expect(menu).toHaveStyle('transform: translateY(-10px)')
	})

	test('seleciona uma opção corretamente', () => {
		const handleChange = jest.fn()
		let selectedValue: string | number = ''

		render(
			<Select
				options={options}
				onChange={event => {
					selectedValue = event.target.value
					handleChange(event)
				}}
				clearError={function (): void {}}
				value={selectedValue}
			/>,
		)

		const selectBox = screen.getByTestId('select-box')

		fireEvent.click(selectBox)

		const optionToSelect = screen.getByText('Opção 2')
		fireEvent.click(optionToSelect)

		expect(optionToSelect).toHaveTextContent('Opção 2')
	})

	test('fecha o menu após selecionar uma opção', () => {
		render(<Select options={options} onChange={jest.fn()} clearError={function (): void {}} />)

		fireEvent.click(screen.getByText('Selecione uma opção'))
		fireEvent.click(screen.getByText('Opção 1'))

		const menu = screen.getByRole('list')

		expect(menu).toHaveStyle('opacity: 0')
		expect(menu).toHaveStyle('transform: translateY(-10px)')
	})
})
