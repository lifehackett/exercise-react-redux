/**
 * Created by mikepugh on 1/22/16.
 */

import React from 'react';
import {Router, Route} from 'react-router';
import Wrapper from './pages/wrapper';
import QuoteslistContainer from './pages/quoteslist';

const routes =
	<Route component={Wrapper}>
		<Route path="/" component={QuoteslistContainer} />
	</Route>;

export default routes;