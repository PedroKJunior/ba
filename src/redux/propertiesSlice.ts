// store/propertiesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import PropertiesAPI from '../API/properties'
import propertiesMapper from '../mappers/propertiesMapper'

import type { Property } from '../@types/property'

interface PropertyState {
	data: Property[]
	loading: boolean
	error: string | null
}

const initialState: PropertyState = {
	data: [],
	loading: false,
	error: null,
}

export const fetchProperties = createAsyncThunk('properties/fetch', async () => {
	const response: Promise<Record<string, Property>> = await PropertiesAPI.getProperties()
	return Object.entries(response)
		.map(([id, obj]) => ({ id, ...obj }))
		.map(propertiesMapper.toDomain)
})

const propertiesSlice = createSlice({
	name: 'properties',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProperties.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchProperties.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchProperties.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Erro ao carregar propriedades'
			})
	},
})

export default propertiesSlice.reducer
