import type { Productor, ProductorDB } from '../@types/productor'

class productorMapper {
	toList(persistence: Productor) {
		return {
			value: persistence.id,
			label: persistence.name,
		}
	}

	toDomain(persistence: ProductorDB & { id: string }) {
		return {
			id: persistence.id,
			name: persistence.name,
			taxId: persistence.tax_id,
		}
	}

	toPersistence(domain: Productor) {
		return {
			tax_id: domain.taxId.replace(/\D/g, ''),
			name: domain.name,
		}
	}
}

export default new productorMapper()
