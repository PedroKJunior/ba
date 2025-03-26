import { grouped, sumGroupedAreas } from '../utils/grouped'

describe('functions grouped and sumGroupedAreas', () => {
	test('grouped', () => {
		const data = [
			{ name: 'A', value: 1 },
			{ name: 'B', value: 2 },
			{ name: 'A', value: 3 },
			{ name: 'B', value: 4 },
		]

		const result = grouped(data, 'name')

		expect(result).toEqual([
			{ name: 'A', value: 2 },
			{ name: 'B', value: 2 },
		])
	})

	test('sumGroupedAreas', () => {
		const data = [
			{ areableArea: 1, vegetationArea: 2 },
			{ areableArea: 3, vegetationArea: 4 },
		]

		const result = sumGroupedAreas(data)

		expect(result).toEqual([
			{ name: 'Área agricultável', value: 4 },
			{ name: 'Gegetação', value: 6 },
		])
	})
})
