import { ref, set, push, get } from 'firebase/database'
import { db } from './firebase'

import type { IHarvestsDB } from '../@types/harvests'

class harvestsAPI {
	addHarvests(harvests: IHarvestsDB) {
		const usersRef = ref(db, 'harvests')
		const newUserRef = push(usersRef)
		set(newUserRef, { ...harvests })
	}

	async getHarvests() {
		const snapshot = await get(ref(db, 'harvests'))
		return snapshot.val()
	}
}

export default new harvestsAPI()
