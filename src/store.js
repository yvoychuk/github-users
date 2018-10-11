import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose


export const store = createStore(
    rootReducer, 
    {},
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);