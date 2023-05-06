import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sliceError from "./sliceError";
import sliceValidationTime from "./sliceVlidationTime";
import sliceValidationReset from "./sliceValidationReset";
import sliceCalendar from "./sliceValidationReset";

export const rootReducer = combineReducers({
    sliceError,
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
