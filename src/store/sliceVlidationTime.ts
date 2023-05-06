import {createSlice} from '@reduxjs/toolkit'

interface IValidationTime {
    validation: number
}

const initialState: IValidationTime = {
    validation: 0
}

export const sliceValidationTime = createSlice({
    name: 'sliceValidationTime',
    initialState,
    reducers: {
		validationTime(state, actions) {
			state.validation = actions.payload
		}
    }
})

export default sliceValidationTime.reducer
