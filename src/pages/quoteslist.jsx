/**
 * Created by mikepugh on 1/22/16.
 */

import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import C from '../constants';
import R from 'ramda';
import actions from '../actions';
import Quote from './components/quote';

export const Quoteslist = React.createClass({
	mixins: [PureRenderMixin],
	newQuote(e) {
		if(!this.props.quotes.submitting) {
			e.preventDefault();
			this.props.submitNewQuote(this.refs.newquote.value);
			this.refs.newquote.value = '';
		}
	},
	render() {
		const p = this.props;
		let rows = R.map((quote) => {
			console.log('Test: ' + p.quotes.states[quote.key]);
			var quotestate = p.quotes.states[quote.key];
			return <Quote
							key={quote.key}
		          quote={quote}
		          qid={quote.key}
		          state={quotestate}
		          edit={p.startEdit.bind(this,quote.key)}
		          cancel={p.cancelEdit.bind(this,quote.key)}
		          submit={p.submitEdit.bind(this,quote.key)}
		          delete={p.deleteQuote.bind(this,quote.key)}
		          mayedit={p.auth.uid === quote.uid}
		          />;
		}, p.quotes.data);
		return (
			<div className="quoteslist">
				{p.auth.uid ?
					<form className="newquoteform" onSubmit={this.newQuote}>
						<input ref="newquote" placeholder="write something clever!"/>
						<button type="submit" disabled={p.quotes.submittingnew}>
							{p.quotes.submittingnew ? "Submitting..." : "Submit"}
						</button>
					</form> :
					<p>
						Log in to add a new quote of your own!
					</p>
				}
				{p.quotes.hasreceiveddata ? rows : "Loading quotes..."}
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		quotes: state.quotes,
		auth: state.auth
	};
}

function mapDispatchToProps(dispatch) {
	return {
		submitNewQuote(content) {
			dispatch(actions.quotesActions.submitNewQuote(content));
		},
		startEdit(qid) {
			dispatch(actions.quotesActions.startQuoteEdit(qid));
		},
		cancelEdit(qid) {
			dispatch(actions.quotesActions.cancelQuoteEdit(qid));
		},
		submitEdit(qid,content) {
			dispatch(actions.quotesActions.submitQuoteEdit(qid, content));
		},
		deleteQuote(qid) {
			dispatch(actions.quotesActions.deleteQuote(qid));
		}
	};
}

export const QuoteslistContainer = connect(mapStateToProps, mapDispatchToProps)(Quoteslist);