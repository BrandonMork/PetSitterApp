import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {HomePage} from 'js/pages/home';
import {RegisterPage} from 'js/pages/register';
import {ReviewPage} from 'js/pages/review';
import {ReportingPage} from 'js/pages/reporting';
import {FindSitter} from 'js/pages/findsitter';
import LoginPage from 'js/pages/login';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/rating-page" component={ReviewPage} />
					<Route exact path="/report-page" component={ReportingPage} />
					<Route exact path="/find-sitter" component={FindSitter} />
				</div>
			</HashRouter>
		);
	}
}