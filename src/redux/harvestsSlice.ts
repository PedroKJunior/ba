import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import HarvestsAPI from '../API/harvests'
import harvestsMapper from '../mappers/harvestsMapper'

import type { IHarvests } from '../@types/harvests'

interface HarvestState {
	data: IHarvests[]
	loading: boolean
	error: string | null
}

const initialState: HarvestState = {
	data: [],
	loading: false,
	error: null,
}

export const fetchHarvests = createAsyncThunk('harvests/fetch', async () => {
	const response: Promise<Record<string, IHarvests>> = await HarvestsAPI.getHarvests()
	return Object.entries(response)
		.map(([id, obj]) => ({ id, ...obj }))
		.map(harvestsMapper.toDomain)
})

const harvestsSlice = createSlice({
	name: 'harvests',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchHarvests.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchHarvests.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchHarvests.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Erro ao carregar safra'
			})
	},
})

export default harvestsSlice.reducer
