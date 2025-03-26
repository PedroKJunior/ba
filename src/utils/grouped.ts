interface GroupedProperty {
	name: string
	value: number
}

interface Property {
	areableArea: number
	vegetationArea: number
}

export function grouped<R, K extends keyof R>(data: R[], key: K): GroupedProperty[] {
	return Object.values(
		data.reduce<Record<string, GroupedProperty>>((acc, curr) => {
			const groupName = String(curr[key])
			acc[groupName] = acc[groupName] || { name: groupName, value: 0 }
			acc[groupName].value += 1
			return acc
		}, {}),
	)
}

export function sumGroupedAreas(data: Property[]): GroupedProperty[] {
	let areableTotal = 0
	let vegetationTotal = 0

	for (const prop of data) {
		areableTotal += Number(prop.areableArea)
		vegetationTotal += Number(prop.vegetationArea)
	}

	return [
		{ name: 'Área agricultável', value: areableTotal },
		{ name: 'Gegetação', value: vegetationTotal },
	]
}
