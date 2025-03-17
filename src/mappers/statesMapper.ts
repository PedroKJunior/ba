import type { State } from '../@types/lists'

class statesMapper {
	toDomain(persistence: State) {
		return {
			value: persistence.sigla,
			label: persistence.nome,
		}
	}
}

export default new statesMapper()
