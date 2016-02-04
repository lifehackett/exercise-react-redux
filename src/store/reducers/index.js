/**
 * Created by mikepugh on 1/22/16.
 */

import {combineReducers} from 'redux';
import authReducer from './auth';
import quotesReducer from './quotes';
import feedbackReducer from './feedback';

const rootReducer = combineReducers({
	auth: authReducer,
	quotes: quotesReducer,
	feedback: feedbackReducer
});

export default rootReducer;