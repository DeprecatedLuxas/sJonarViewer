import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ReturnType from "typescript";

import knownReducer from "./knowns/reducer";
const initialState = {};
const middleware = [thunk];

// Redux Devtools
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const reducer = combineReducers({
    known: knownReducer,
});

export type RootState = ReturnType<typeof reducer>;

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        (window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()) as any
    )
);
export default store;
