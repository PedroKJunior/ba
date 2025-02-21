import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../components/Input'

describe('Input Component', () => {
	test('renderiza corretamente com placeholder', () => {
		render(<Input placeholder="Digite algo" onChange={jest.fn()} />)

		expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument()
	})

	test('renderiza corretamente com valor', () => {
		render(<Input value="Valor" onChange={jest.fn()} />)

		expect(screen.getByDisplayValue('Valor')).toBeInTheDocument()
	})

	test('chama a função de onChange corretamente', () => {
		const handleChange = jest.fn()
		render(<Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} />)

		const input = screen.getByRole('textbox')

		fireEvent.change(input, { target: { value: 'Novo valor' } })

		expect(handleChange).toHaveBeenCalledWith('Novo valor')
	})
})
