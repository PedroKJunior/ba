import type { Property, PropertyDB } from '../@types/property'

class propertiesMapper {
	toList(persistence: Property) {
		return {
			value: persistence.id,
			label: persistence.name,
		}
	}

	toDomain(persistence: PropertyDB & { id: string }) {
		return {
			id: persistence.id,
			name: persistence.name,
			city: persistence.city,
			state: persistence.state,
			totalArea: persistence.total_area,
			areableArea: persistence.areable_area,
			vegetationArea: persistence.vegetation_area,
			productorId: persistence.productor_id,
		}
	}

	toPersistence(domain: Property) {
		return {
			name: domain.name,
			city: domain.city,
			state: domain.state,
			total_area: domain.totalArea,
			areable_area: domain.areableArea,
			vegetation_area: domain.vegetationArea,
			productor_id: domain.productorId,
		}
	}
}

export default new propertiesMapper()
