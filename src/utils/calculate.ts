export function calculate(areableArea: number, vegetationArea: number, totalArea: number): boolean {
	return Number(totalArea) < Number(areableArea) + Number(vegetationArea)
}
