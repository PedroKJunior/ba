import { createSlice } from '@reduxjs/toolkit'

import { Crop } from '../@types/harvests'

const initialState: Crop = {
	harvestYear: '',
	cropType: '',
	farm: '',
}

export const slice = createSlice({
	name: 'crop',
	initialState,
	reducers: {
		setCrop: (state, { payload }) => ({
			...state,
			...payload,
		}),
		resetCrop: () => initialState,
	},
})

export const { setCrop, resetCrop } = slice.actions

export const selectUser = (state: { crop: Crop }) => state.crop

export default slice.reducer
