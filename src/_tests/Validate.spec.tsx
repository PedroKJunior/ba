import Validate from '../utils/validateTax'

describe('Validate CPF', () => {
	test('Should return true if CPF is valid', () => {
		expect(Validate.validateCPF('12345678909')).toBe(true)
	})
	test('Should return false if CPF is invalid', () => {
		expect(Validate.validateCPF('12345678900')).toBe(false)
	})
	test('Should return false for a CPF with incorrect length', () => {
		expect(Validate.validateCPF('1234567890')).toBe(false)
	})
})

describe('Validate CNPJ', () => {
	test('should return true for a valid CNPJ', () => {
		expect(Validate.validateCNPJ('11222333000181')).toBe(true)
	})

	test('should return false for an invalid CNPJ', () => {
		expect(Validate.validateCNPJ('11222333000100')).toBe(false)
	})
})

describe('Validate Tax', () => {
	test('should validate CPF or CNPJ correctly', () => {
		expect(Validate.validateTax('892.241.366-28')).toBe(true)
		expect(Validate.validateTax('11.222.333/0001-81')).toBe(true)
		expect(Validate.validateTax('invalid')).toBe(false)
	})
})
