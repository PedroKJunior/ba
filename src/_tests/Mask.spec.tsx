import { formatTax } from '../utils/mask'

describe('Tax Document Formatter', () => {
	test('Should format CPF correctly', () => {
		expect(formatTax('12345678909')).toBe('123.456.789-09')
	})

	test('Should format CNPJ correctly', () => {
		expect(formatTax('11222333000181')).toBe('11.222.333/0001-81')
	})

	test('Should remove non-numeric characters and format CPF', () => {
		expect(formatTax('123.456.789-09')).toBe('123.456.789-09')
	})

	test('Should remove non-numeric characters and format CNPJ', () => {
		expect(formatTax('11.222.333/0001-81')).toBe('11.222.333/0001-81')
	})

	test('Should return empty string if input is empty', () => {
		expect(formatTax('')).toBe('')
	})

	test('Should return the same string if input is invalid', () => {
		expect(formatTax('invalid123')).toBe('123')
	})
})
