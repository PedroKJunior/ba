declare global {
	type SelectEvent = { target: { name: string; value: string | number } }
}
