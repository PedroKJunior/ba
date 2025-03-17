import type { IHarvests, IHarvestsDB } from '../@types/harvests'

class harvestsMapper {
	toList(persistence: IHarvests) {
		return {
			value: persistence.id,
			label: persistence.cropType,
		}
	}

	toDomain(persistence: IHarvestsDB & { id: string }) {
		return {
			id: persistence.id,
			harvestYear: persistence.harvest_year,
			cropType: persistence.crop_type,
			property: persistence.property_id,
		}
	}

	toPersistence(domain: IHarvests) {
		return {
			harvest_year: domain.harvestYear,
			crop_type: domain.cropType,
			property_id: domain.property,
		}
	}
}

export default new harvestsMapper()
