import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyATkc0XjtjQ3UUmOkjSTUPPRlzCTjywg78',
	authDomain: 'brainagricultureapi.firebaseapp.com',
	databaseURL: 'https://brainagricultureapi-default-rtdb.firebaseio.com',
	projectId: 'brainagricultureapi',
	storageBucket: 'brainagricultureapi.firebasestorage.app',
	messagingSenderId: '261119433006',
	appId: '1:261119433006:web:92597eb2a59d18affbc2bf',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
