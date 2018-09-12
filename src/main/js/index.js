import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Pages.Home} />
					<Route exact path="/register" component={Pages.RegisterPage} />
					<Route exact path="/login" component={Pages.LoginPage} />
					<Route exact path="/rating-page" component={Pages.ReviewPage} />
					<Route exact path="/report-page" component={Pages.ReportingPage} />
					<Route exact path="/find-sitter" component={Pages.FindSitter} />
				</div>
			</HashRouter>
		);
	}
}