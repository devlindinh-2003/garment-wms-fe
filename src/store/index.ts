import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { Action, AnyAction, Reducer, combineReducers } from "redux";

// Define the Reducers that will always be present in the application
const staticReducers: Record<string, Reducer<any, AnyAction>> = {};

// Extend the ToolkitStore type to include asyncReducers property
interface ToolkitStoreExtended<S = any, A extends Action = AnyAction>
    extends EnhancedStore<S, A> {
    asyncReducers?: Record<string, Reducer<any, AnyAction>>;
}

const store: ToolkitStoreExtended = configureStore({
    reducer: createReducer(),
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key: string, asyncReducer: Reducer<any, AnyAction>) => {
    if (!store.asyncReducers) {
        store.asyncReducers = {};
    }
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return asyncReducer;
};

function createReducer(asyncReducers: Record<string, Reducer<any, AnyAction>> = {}) {
    if (Object.keys(asyncReducers).length === 0) {
        return (state: any = {}) => state;
    } else {
        return combineReducers({
            ...staticReducers,
            ...asyncReducers,
        });
    }
}

export default store;