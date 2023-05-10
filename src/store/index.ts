import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sliceValidationTime from "./sliceVlidationTime";
import sliceValidationReset from "./sliceValidationReset";
import sliceCalendar from "./sliceValidationReset";

export const rootReducer = combineReducers({
    sliceValidationTime,
    sliceValidationReset,
    sliceCalendar
})

export const reducerToolkit = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type ReducerToolkitState = ReturnType<typeof reducerToolkit>
export type AppDispatch = ReducerToolkitState['dispatch']
