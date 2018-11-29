import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {Switch} from 'react-router';
import NavigationBar from './components/Navbar';
import '../styles/pageStyles.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MainPageReview from './pages/MainPageReview';
import ReportPage from './pages/ReportPage';
import FindSitterPage from './pages/FindSitterPage';
import PetPage from './pages/PetPage';
import PostJobPage from './pages/PostJobPage';
import SearchJobPage from './pages/SearchJobPage';
import ReviewJobPage from './pages/ReviewJobPage';
import AcceptJobPage from './pages/AcceptJobPage';
import EditPetPage from './pages/EditPetPage';
import ViewSitterPage from './pages/ViewSitterPage';
import MyJobPage from 'js/pages/MyJobPage';
import MainReviewPage from './pages/MainReviewPage.js';


class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			notifications: []
		};

		this.instance = React.createRef();
		this.addNotification = this.addNotification.bind(this);
		this.removeNotification = this.removeNotification.bind(this);
	}

	addNotification(notification) {
		const id = this.instance.current.addNotification(notification);

		return this.setState({
			notifications: [
				...this.state.notifications,
				id
			]
		});
	}

	removeNotification() {
		if (this.state.notifications.length === 0) return;

		const { notifications } = this.state;
		const id = notifications[notifications.length - 1];

		// trigger notification removal
		this.instance.current.removeNotification(id);

		// remove notification from state
		this.setState({
			notifications: notifications.filter(item => item !== id)
		});
	}

	render() {
		return (
			<div className='pageContainer'>
				<div className='pageContent container padded'>
					<NavigationBar
						addNotification={this.addNotification}
						removeNotification={this.removeNotification}
					/>
					<HashRouter>
						<Switch>
							<Route exact path='/' component={HomePage} />
							<Route exact path='/home' component={HomePage} />
							<Route exact path='/register' component={RegisterPage} />
							<Route exact path='/login' render={(props) =>
								<LoginPage {...props}
										   addNotification={this.addNotification}
										   removeNotification={this.removeNotification}
								/>}
							/>
							<Route exact path='/profile-page' component={ProfilePage} />
							<Route exact path='/rating-page' component={MainPageReview} />
							<Route exact path='/report-page' component={ReportPage} />
							<Route exact path='/find-sitter' component={FindSitterPage} />
							<Route exact path='/profile' component={ProfilePage} />
							<Route exact path='/add-pet' component={PetPage}/>
							<Route exact path='/post-job' component={PostJobPage}/>
							<Route exact path='/search-job' component={SearchJobPage}/>
							<Route exact path='/review-job-page' component={ReviewJobPage}/>
							<Route exact path='/accept-job-page' component={AcceptJobPage}/>
							<Route exact path='/edit-pet-page' component={EditPetPage}/>
							<Route exact path='/view-sitter-page' component={ViewSitterPage}/>
							<Route exact path='/my-job-page' component={MyJobPage}/>
						</Switch>
					</HashRouter>

					<ReactNotification
						// onNotificationRemoval={this.onNotificationRemoval}
						types={[{
							htmlClasses: ['notification-awesome'],
							name: 'awesome'
						}]}
						ref={this.instance}
						isMobile={true}
					/>
				</div>
			</div>
		);
	}
}

export default Index;
