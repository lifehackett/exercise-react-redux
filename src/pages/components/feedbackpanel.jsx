/**
 * Created by mikepugh on 1/22/16.
 */

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import actions from '../../actions';
import C from '../../constants';

export const FeedbackPanel = React.createClass({
	mixins: [PureRenderMixin],
	render() {
		const p = this.props;
		const rows = p.feedback.map((f,n) => {
			return (
				<div key={n} className={"feedback"+(f.error?" error":"")}>
					{f.msg}
					<button onClick={p.dismissFeedback.bind(this,n)}>X</button>
				</div>
			);
		});
		return (
			<div className="feedbacklist">
				{rows}
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		feedback: state.feedback
	}
};

function mapDispatchToProps(dispatch) {
	return {
		dismissFeedback(n) {
			dispatch(actions.feedbackActions.dismissFeedback(n));
		}
	}
};

export const FeedbackPanelContainer = connect(mapStateToProps,mapDispatchToProps)(FeedbackPanel);

