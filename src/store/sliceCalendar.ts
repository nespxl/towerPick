import {createSlice} from '@reduxjs/toolkit'

interface ICalendar {
    dayCalendar: string
}

const initialState: ICalendar = {
    dayCalendar: ''
}

export const sliceCalendar = createSlice({
    name: 'sliceCalendar',
    initialState,
    reducers: {
		dayCalendar(state, actions) {
			state.dayCalendar = actions.payload
		}
    }
})

export default sliceCalendar.reducer
