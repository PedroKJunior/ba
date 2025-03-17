export interface State {
	id: number
	sigla: string
	nome: string
	regiao: {
		id: number
		sigla: string
		nome: string
	}
}

export interface City {
	nome: string
	codigo_ibge: string
}
