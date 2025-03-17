import { ref, set, push, get } from 'firebase/database'
import { db } from './firebase'

import type { PropertyDB } from '../@types/property'

class propertiesAPI {
	addProperties(property: PropertyDB) {
		const usersRef = ref(db, 'properties')
		const newUserRef = push(usersRef)
		set(newUserRef, { ...property })
	}

	async getProperties() {
		const snapshot = await get(ref(db, 'properties'))
		return snapshot.val()
	}
}

export default new propertiesAPI()
