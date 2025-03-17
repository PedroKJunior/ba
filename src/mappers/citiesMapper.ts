import type { City } from '../@types/lists'

class citiesMapper {
	toDomain(persistence: City) {
		return {
			value: persistence.nome
				.toLowerCase()
				.trim()
				.split(' ')
				.map(word => {
					return word[0].toLocaleUpperCase().concat(word.substring(1))
				})
				.join(' '),
			label: persistence.nome
				.toLowerCase()
				.trim()
				.split(' ')
				.map(word => {
					return word[0].toLocaleUpperCase().concat(word.substring(1))
				})
				.join(' '),
		}
	}
}

export default new citiesMapper()
