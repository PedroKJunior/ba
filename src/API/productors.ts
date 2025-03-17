import { ref, set, push, get } from 'firebase/database'
import { db } from './firebase'

import type { ProductorDB } from '../@types/productor'

class productorsAPI {
	addProductors(productor: ProductorDB) {
		const usersRef = ref(db, 'productors')
		const newUserRef = push(usersRef)
		set(newUserRef, { ...productor })
	}

	async getProductors() {
		const snapshot = await get(ref(db, 'productors'))
		return snapshot.val()
	}
}

export default new productorsAPI()
