/**
 * Created by mikepugh on 1/22/16.
 */
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import initialState from './initialstate';
import thunk from 'redux-thunk';

const logger = store => next => action => {
	console.log('dispatching', action.type, action);
	const result = next(action);
	console.log('next state', store.getState());
	return result;
}

const createStoreWithMiddleware = applyMiddleware(
	thunk,
	logger
)(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);

export default store;