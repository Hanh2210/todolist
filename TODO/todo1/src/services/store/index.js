
import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import AllReducers from '../reducers/index'

// const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
// const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)

// import { createStore } from 'redux';
const store = createStore(AllReducers);
// const store = createStore(rootReducer, undefined, undefined); 

export default store;