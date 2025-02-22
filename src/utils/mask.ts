export function formatTax(doc: string): string {
	doc = doc.replace(/\D/g, '')
	if (doc.length <= 11) {
		return doc
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{2})$/, '$1-$2')
	} else {
		return doc
			.replace(/(\d{2})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1/$2')
			.replace(/(\d{4})(\d{2})$/, '$1-$2')
	}
}
