import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {HomePage} from 'js/pages/home';
import {RegisterPage} from 'js/pages/register';
import {ReviewPage} from 'js/pages/review';
import {ReportingPage} from 'js/pages/report';
import {FindSitterPage} from 'js/pages/findSitter';

import LoginRegistrationPage from 'js/pages/login';
import AddPetPage from 'js/pages/addpet';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route exact path="/login" component={LoginRegistrationPage} />
					<Route exact path="/rating-page" component={ReviewPage} />
					<Route exact path="/report-page" component={ReportingPage} />
					<Route exact path="/find-sitter" component={FindSitterPage} />
					<Route exact path="/add-pet" component={AddPetPage} />

				</div>
			</HashRouter>
		);
	}
}