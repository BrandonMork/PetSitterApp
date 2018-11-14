import React from 'react';
import _ from 'lodash';
import {Jumbotron, Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import '../../styles/pageStyles.css';
import PropTypes from 'prop-types';

class PageContainer extends React.Component {

	render() {
		return (
			<div className="pageContainer">
				<div className="container padded pageContent">
					<div>
						<NavigationBar/>
					</div>



				</div>
			</div>
		);
	}
}

PageContainer.contextTypes = {
	router: PropTypes.object.isRequired,
};

PageContainer = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(PageContainer);

export default PageContainer;
