import {createSlice} from '@reduxjs/toolkit'

interface IValidationReset {
    validation: Array<string>
    validationDate: any
    validationFloor: Array<string>
    validationMeeting: Array<string>
    validationStart: Array<string>
    validationEnd: Array<string>
}

const initialState: IValidationReset = {
    validation: ['Не выбрано', 'Не выбрано'],
    validationDate: ['Не выбрано', 'Не выбрано'],
    validationFloor: ['Не выбрано', 'Не выбрано'],
    validationMeeting: ['Не выбрано', 'Не выбрано'],
    validationStart: ['Не выбрано', 'Не выбрано'],
    validationEnd: ['Не выбрано', 'Не выбрано']
}

export const sliceValidationReset = createSlice({
    name: 'sliceValidationReset',
    initialState,
    reducers: {
        validationDate(state, actions) {
            state.validationDate.push(actions.payload)
        },
		validationReset(state, actions) {
			state.validation.push(actions.payload)
		},
        validationResetFloor(state, actions) {
			state.validationFloor.push(actions.payload)
		},
        validationResetMeeting(state, actions) {
			state.validationMeeting.push(actions.payload)
		},
        validationResetStart(state, actions) {
			state.validationStart.push(actions.payload)
		},
        validationResetEnd(state, actions) {
			state.validationEnd.push(actions.payload)
		},
        resetDate(state) {
			state.validation = ['Не выбрано', 'Не выбрано']
		},
        resetTower(state) {
			state.validation = ['Не выбрано', 'Не выбрано']
		},
        resetFloor(state) {
			state.validationFloor = ['Не выбрано', 'Не выбрано']
		},
        resetMeeting(state) {
			state.validationMeeting = ['Не выбрано', 'Не выбрано']
		},
        resetStart(state) {
			state.validationStart = ['Не выбрано', 'Не выбрано']
		},
        resetEnd(state) {
			state.validationEnd = ['Не выбрано', 'Не выбрано']
		},
    }
})

export default sliceValidationReset.reducer
