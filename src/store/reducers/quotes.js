/**
 * Created by mikepugh on 1/22/16.
 */

import C from '../../constants';
import initialState from '../initialstate';
import R from 'ramda';

export default function(currentstate, action) {
	let newstate;
	switch(action.type) {
		case C.RECEIVE_QUOTES_DATA:
			return Object.assign({},currentstate, {
				hasreceiveddata: true,
				data: action.data
			});
		case C.AWAIT_NEW_QUOTE_RESPONSE:
			return Object.assign({},currentstate,{
				submittingnew: true
			});
		case C.RECEIVE_NEW_QUOTE_RESPONSE:
			return Object.assign({},currentstate, {submittingnew: false});
		case C.START_QUOTE_EDIT:
			newstate = R.clone(currentstate);
			newstate.states[action.qid] = C.EDITING_QUOTE;
			return newstate;
		case C.FINISH_QUOTE_EDIT:
			newstate = R.clone(currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_QUOTE_EDIT:
			newstate = R.clone(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_QUOTE;
			return newstate;
		default:
			return currentstate || initialState.quotes;
	}
}
