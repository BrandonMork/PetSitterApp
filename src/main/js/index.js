import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

// Pages
import Pages from './layouts/Pages';
import LoginPage from './views/Pages/LoginPage';
import RegisterPage from './views/Pages/RegisterPage';
import Dashboard from './layouts/Dashboard';

class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route exact path="/pages" component={Pages} />
					<Route exact path="/" component={Dashboard} />
				</div>
			</HashRouter>
		);
	}
}

export default Index;
