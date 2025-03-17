class List {
	async getCities(uf: string) {
		const response = await fetch(
			`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`,
		)
		return response.json()
	}

	async getStates() {
		const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
		return response.json()
	}
}

export default new List()
