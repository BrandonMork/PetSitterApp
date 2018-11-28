import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import '../styles/pageStyles.css';
import 'react-notifications/lib/notifications.css';
import {Switch} from 'react-router';
import {NotificationContainer} from 'react-notifications';
import NavigationBar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ReviewPage from './pages/ReviewPage';
import ReportPage from './pages/ReportPage';
import FindSitterPage from './pages/FindSitterPage';
import PetPage from './pages/PetPage';
import PostJobPage from './pages/PostJobPage';
import SearchJobPage from './pages/SearchJobPage';
import ReviewJobPage from './pages/ReviewJobPage';
import AcceptJobPage from './pages/AcceptJobPage';
import EditPetPage from './pages/EditPetPage';
import ViewSitterPage from './pages/ViewSitterPage';


class Index extends React.Component {
	render() {
		return (
			<div className="pageContainer">
				<div className="pageContent container padded">
					<NavigationBar/>
					<HashRouter>
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/home" component={HomePage} />
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
							<Route exact path="/view-sitter-page" component={ViewSitterPage}/>
						</Switch>
					</HashRouter>
				</div>

				<NotificationContainer/>
			</div>
		);
	}
}

export default Index;
