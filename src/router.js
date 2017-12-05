import React from 'react';
import {
	Router,
	Route
} from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import Books from "./routes/Books.js";

function RouterConfig({
	history
}) {
	return (
		<Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/books" component={Books} />
    </Router>
	);
}

export default RouterConfig;