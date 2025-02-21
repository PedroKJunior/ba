import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/Button'

describe('Button Component', () => {
	test('renderiza corretamente com children', () => {
		render(<Button>Texto</Button>)

		expect(screen.getByText('Texto')).toBeInTheDocument()
	})

	test('chama a função de onClick corretamente', () => {
		const handleClick = jest.fn()
		render(<Button onClick={handleClick}>Texto</Button>)

		const button = screen.getByRole('button')

		fireEvent.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})
})
