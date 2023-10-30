import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { certificatesReducer } from "./reducers/certificatesReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    certificates: certificatesReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector