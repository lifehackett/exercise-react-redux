/**
 * Created by mikepugh on 1/22/16.
 */

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import actions from '../../actions';
import C from '../../constants';
import {Link} from 'react-router';

export const AuthPanel = React.createClass({
	mixins: [PureRenderMixin],
	render() {
		const p = this.props;
		let auth = p.auth;
		switch(auth.currently) {
			case C.LOGGED_IN:
				return (
					<div className="authPanel">
						<span>Logged in as {auth.username}.</span>
						{' '}<button onClick={p.logoutUser}>Log Out</button>
					</div>
				);
			case C.AWAITING_AUTH_RESPONSE:
				return (
					<div className="authPanel">
						<button disabled><i className="fa fa-spinner fa-spin"></i> authenticating...</button>
					</div>
				);
			default:
				return (
					<div className="authPanel">
						<button onClick={p.attemptLogin}>Log in</button>
					</div>
				);
		}
	}
});

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

function mapDispatchToProp(dispatch) {
	return {
		attemptLogin() {
			dispatch(
				actions.authActions.attemptLogin()
			);
		},
		logoutUser() {
			dispatch(
				actions.authActions.logoutUser()
			);
		}
	};
}

export const AuthPanelContainer = connect(mapStateToProps,mapDispatchToProp)(AuthPanel);