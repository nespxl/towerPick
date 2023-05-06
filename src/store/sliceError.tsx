import {createSlice} from '@reduxjs/toolkit'

interface IError {
    errorTower: boolean
}

const initialState: IError = {
    errorTower: false
}

export const sliceError = createSlice({
    name: 'sliceError',
    initialState,
    reducers: {
		towerError(state, actions) {
			state.errorTower = actions.payload
		}
    }
})

export default sliceError.reducer
