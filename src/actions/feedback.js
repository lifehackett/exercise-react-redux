import C from '../constants';

export default {
	dismissFeedback(num) {
		return {
			type: C.DISMISS_FEEDBACK,
			num
		}
	}
};