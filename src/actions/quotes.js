/**
 * Created by mikepugh on 1/22/16.
 */

import C from '../constants';
var Firebase = require('firebase');
import utils from '../utils';

const quotesRef = new Firebase(C.FIREBASE).child("quotes");

export default {
	startListeningToQuotes() {
		return (dispatch, getState) => {
			quotesRef.on("value", (snapshot) => {
				let quotesArr = [];
				snapshot.forEach(function(quote) {
					let v = quote.val();
					quotesArr.push({
						key: quote.key(),
						content: v.content,
						uid: v.uid,
						username: v.username
					});
				});
				dispatch({
					type: C.RECEIVE_QUOTES_DATA,
					data: quotesArr
				});
			});
		}
	},
	startQuoteEdit(qid) {
		return {
			type: C.START_QUOTE_EDIT,
			qid
		}
	},
	cancelQuoteEdit(qid) {
		return {
			type: C.FINISH_QUOTE_EDIT,
			qid
		}
	},
	deleteQuote(qid) {
		return (dispatch, getState) => {
			dispatch({
				type: C.SUBMIT_QUOTE_EDIT,
				qid
			});
			quotesRef.child(qid).remove((error) => {
				dispatch({
					type: C.FINISH_QUOTE_EDIT,
					qid
				});
				if(error) {
					dispatch({
						type: C.DISPLAY_ERROR,
						error: "Deletion failed! " + error
					});
				} else {
					dispatch({
						type: C.DISPLAY_MESSAGE,
						message: "Quote successfully deleted!"
					});
				}
			});
		}
	},
	submitQuoteEdit(qid,content) {
		return (dispatch, getState) => {
			const state = getState();
			const {username, uid} = state.auth;
			const error = utils.validateQuote(content);
			if(error) {
				dispatch({
					type: C.DISPLAY_ERROR,
					error
				});
			} else {
				dispatch({
					type: C.SUBMIT_QUOTE_EDIT,
					qid
				});
				quotesRef.child(qid).set({content,username,uid}, (error) => {
					dispatch({
						type: C.FINISH_QUOTE_EDIT,
						qid
					});
					if(error) {
						dispatch({
							type: C.DISPLAY_ERROR,
							error: "Update failed! " + error
						});
					} else {
						dispatch({
							type: C.DISPLAY_MESSAGE,
							message: "Update successfully saved!"
						});
					}
				});
			}
		};
	},
	submitNewQuote(content) {
		return (dispatch, getState) => {
			const state = getState(),
						{username, uid} = state.auth,
						error = utils.validateQuote(content);
			if(error) {
				dispatch({
					type: C.DISPLAY_ERROR,
					error
				});
			} else {
				dispatch({
					type: C.AWAIT_NEW_QUOTE_RESPONSE
				});
				quotesRef.push({content,username,uid}, (error) => {
					dispatch({
						type: C.RECEIVE_NEW_QUOTE_RESPONSE
					});
					if(error) {
						dispatch({
							type: C.DISPLAY_ERROR,
							error: "Submission failed! " + error
						});
					} else {
						dispatch({
							type: C.DISPLAY_MESSAGE,
							message: "Submission successfully saved!"
						});
					}
				});
			}
		};
	}
};
