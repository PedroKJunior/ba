import { configureStore } from '@reduxjs/toolkit'

import harvestsReducer from './harvestsSlice'
import propertiesReducer from './propertiesSlice'

export const store = configureStore({
	reducer: {
		harvests: harvestsReducer,
		properties: propertiesReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
