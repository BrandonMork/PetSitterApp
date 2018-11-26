import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

// Pages
import HomePage from 'js/pages/HomePage';
import RegisterPage from 'js/pages/RegisterPage';
import LoginPage from 'js/pages/LoginPage';
import ReviewPage from 'js/pages/ReviewPage';
import ReportPage from 'js/pages/ReportPage';
import FindSitterPage from 'js/pages/FindSitterPage';
import ProfilePage from 'js/pages/ProfilePage';
import PetPage from 'js/pages/PetPage';
import PostJobPage from 'js/pages/PostJobPage';
import ReviewJobPage from 'js/pages/ReviewJobPage';
import SearchJobPage from 'js/pages/SearchJobPage';
import AcceptJobPage from 'js/pages/AcceptJobPage';
import EditPetPage from 'js/pages/EditPetPage';
import {Switch} from 'react-router';
import NavigationBar from 'js/components/Navbar';

import '../styles/pageStyles.css';

class Index extends React.Component {
	render() {
		return (
			<React.Fragment className="pageContainer">
				<div className="pageContent">
					<NavigationBar/>
					<HashRouter>
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/register" component={RegisterPage} />
							<Route exact path="/login" component={LoginPage} />
							<Route exact path="/profile-page" component={ProfilePage} />
							<Route exact path="/rating-page" component={ReviewPage} />
							<Route exact path="/report-page" component={ReportPage} />
							<Route exact path="/find-sitter" component={FindSitterPage} />
							<Route exact path="/profile" component={ProfilePage} />
							<Route exact path="/add-pet" component={PetPage}/>
							<Route exact path="/post-job" component={PostJobPage}/>
							<Route exact path="/search-job" component={SearchJobPage}/>
							<Route exact path="/review-job-page" component={ReviewJobPage}/>
							<Route exact path="/accept-job-page" component={AcceptJobPage}/>
							<Route exact path="/edit-pet-page" component={EditPetPage}/>
						</Switch>
					</HashRouter>
				</div>
			</React.Fragment>
		);
	}
}

export default Index;
