/**
 * Created by mikepugh on 1/22/16.
 */

import C from '../constants';

export default {
	feedback: [
		{msg:"Welcome to this little demo! It is meant to demonstrate three things:",error:false},
		{msg:"1) How to use Redux + Firebase",error:false},
		{msg:"2) How to use authentication in a Redux app",error:false},
		{msg:"3) How to have all UI state in Redux and none in the components",error:false}
	],
	auth: {
		currently: C.ANONYMOUS,
		username: null,
		uid: null
	},
	quotes: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // this will store per quote id if we're reading, editing or awaiting DB response
		data: {} // this will contain firebase data
	}
}
