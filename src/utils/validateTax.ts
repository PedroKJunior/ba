class Validate {
	validateCPF(cpf: string): boolean {
		if (cpf.length !== 11) {
			return false
		}

		const digits = cpf.split('').map(Number)

		let sumL = 0
		for (let i = 0; i < 9; i++) {
			sumL += digits[i] * (10 - i)
		}
		const remainderL = sumL % 11
		const d10 = remainderL === 0 || remainderL === 1 ? 0 : 11 - remainderL

		let sumM = 0
		for (let i = 0; i < 9; i++) {
			sumM += digits[i + 1] * (10 - i)
		}
		sumM += d10 * 2
		const remainderM = sumM % 11
		const d11 = remainderM === 0 || remainderM === 1 ? 0 : 11 - remainderM

		return d10 === digits[9] && d11 === digits[10]
	}

	validateCNPJ(cnpj: string): boolean {
		console.log(cnpj)
		if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

		let length = cnpj.length - 2
		let numberDoc = cnpj.substring(0, length)
		const digits = cnpj.substring(length)
		let sum = 0
		let pos = length - 7

		for (let i = length; i >= 1; i--) {
			sum += Number(numberDoc.charAt(length - i)) * pos--
			if (pos < 2) pos = 9
		}
		let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
		if (result !== parseInt(digits.charAt(0))) return false

		length = length + 1
		numberDoc = cnpj.substring(0, length)
		sum = 0
		pos = length - 7

		for (let i = length; i >= 1; i--) {
			sum += Number(numberDoc.charAt(length - i)) * pos--
			if (pos < 2) pos = 9
		}
		result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

		return result === parseInt(digits.charAt(1))
	}

	validateTax(document: string): boolean {
		document = document.replace(/\D/g, '')

		if (document.length === 11) return this.validateCPF(document)
		if (document.length === 14) return this.validateCNPJ(document)
		return false
	}
}

export default new Validate()
