import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

// Pages
import HomePage from 'js/pages/home';
import RegisterPage from 'js/pages/register';
import LoginPage from 'js/pages/login';
import ReviewPage from 'js/pages/review';
import ReportingPage from 'js/pages/report';
import FindSitterPage from 'js/pages/findSitter';
import ProfilePage from 'js/pages/profile';
import PetPage from 'js/pages/PetPage';

class Index extends React.Component {
	render() {
		return (



			<HashRouter>
				<div>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/register" component={RegisterPage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/profile-page" component={ProfilePage} />
					<Route exact path="/rating-page" component={ReviewPage} />
					<Route exact path="/report-page" component={ReportingPage} />
					<Route exact path="/find-sitter" component={FindSitterPage} />
					<Route exact path="/profile" component={ProfilePage} />
					<Route exact path="/add-pet" component={PetPage}/>
				</div>
			</HashRouter>
		);
	}
}

export default Index;