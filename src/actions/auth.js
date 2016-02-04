/**
 * Created by mikepugh on 1/22/16.
 */

import C from '../constants';
var Firebase = require('firebase');

const fireRef = new Firebase(C.FIREBASE);

export default {
	startListeningToAuth() {
		return (dispatch, getState) => {
			fireRef.onAuth((authData) => {
				if(authData) {
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid,
						username: authData.github.displayName || authDate.github.username
					});
				} else {
					if(getState().auth.currently !== C.ANONYMOUS) {
						dispatch({
							type: C.LOGOUT
						});
					}
				}
			});
		}
	},
	attemptLogin() {
		return (dispatch, getState) => {
			dispatch({type: C.ATTEMPTING_LOGIN});
			fireRef.authWithOAuthPopup("github", (error, authData) => {
				if(error) {
					dispatch({
						type: C.DISPLAY_ERROR,
						error: "Login Failed! " + error
					});
					dispatch({
						type: C.LOGOUT
					});
				}
			});
		}
	},
	logoutUser() {
		return (dispatch, getState) => {
			dispatch({
				type: C.LOGOUT
			});
			fireRef.unauth();
		}
	}
};

