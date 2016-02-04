/**
 * Created by mikepugh on 1/22/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';

import actions from './actions';
import {Wrapper} from './pages/wrapper';
import {QuoteslistContainer} from './pages/quoteslist';

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route component={Wrapper}>
				<Route path="/" component={QuoteslistContainer}/>
			</Route>
		</Router>
	</Provider>,

	document.getElementById('root')
);

setTimeout(function() {
	store.dispatch(actions.authActions.startListeningToAuth());
	store.dispatch(actions.quotesActions.startListeningToQuotes());
});