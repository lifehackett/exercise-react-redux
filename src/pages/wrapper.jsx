/**
 * Created by mikepugh on 1/22/16.
 */

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {AuthPanelContainer} from './components/authpanel';
import {FeedbackPanelContainer} from './components/feedbackpanel';

export const Wrapper = React.createClass({
	mixins: [PureRenderMixin],
	render() {
		return (
			<div className="wrapper">
				<AuthPanelContainer/>
				<div className="center">
					<FeedbackPanelContainer />
					{this.props.children}
				</div>
			</div>
		);
	}
});

