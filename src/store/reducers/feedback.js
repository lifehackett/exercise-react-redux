/**
 * Created by mikepugh on 1/22/16.
 */

import C from '../../constants';
import initialState from '../initialstate';
import R from 'ramda';

// A Ramda "Extras" lib would be good for this
const filterByIndex = R.addIndex(R.filter);

export default function(currentfeedback, action) {
	switch(action.type) {
		case C.DISMISS_FEEDBACK:
			return filterByIndex((val, idx) => idx !== action.num, currentfeedback);
		case C.DISPLAY_ERROR:
			return R.concat(currentfeedback,{msg:action.error,error:true});
		case C.DISPLAY_MESSAGE:
			return R.concat(currentfeedback,{msg:action.message,error:false});
		default:
			return currentfeedback || initialState.feedback;
	}
}