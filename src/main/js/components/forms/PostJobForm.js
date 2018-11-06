import React from 'react';
import PetList from 'js/components/PetList';
import {postJob} from 'js/utils/Users';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import {Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Button
} from 'reactstrap';
import PropTypes from 'prop-types';

class PostJobForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.updatedJob = {};
	}

	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			updatedJob: {
				pets: e.target.pets.value,
				startDate: e.target.startDate.value,
				endDate: e.target.endDate.value,
				addressLine1: e.target.addressLine1.value,
				addressLine2: e.target.addressLine2.value,
				city: e.target.city.value,
				state: e.target.state.value,
				zip: e.target.zip.value
			}},
			function() {
				//console.log('Im adding a job!');
				//console.log(this.state.newJob);
				//console.log(this.state.updatedJob);

				// @TODO Brandon post job
				postJob(this.state.updatedJob);
				return this.context.router.history.push('/');
			});
	};

	render() {
		return (
			<React.Fragment>
				<Form name="form" onSubmit={this.handleSubmit}>
					<p>List of your pets:</p>
					<PetList/>

					<FormGroup>
						<Label for="pets">Which pet needs sitting?</Label>
						<Input type="text" ref="pets" name="pets" id="pets" placeholder="Pet Name"/>
					</FormGroup>

					<FormGroup>
						<Label for="startDate">Start Date</Label>
						<Input type="date" ref="startDate" name="startDate" id="startDate" placeholder="YYYY-MM-DD"/>
					</FormGroup>

					<FormGroup>
						<Label for="endDate">End Date</Label>
						<Input type="date" ref="endDate" name="endDate" id="endDate" placeholder="YYYY-MM-DD"/>
					</FormGroup>

					<h3>Where is the job located? </h3>
					<p>Sitters will only see the approximate area. Location will be shown after you've accepted their bid.</p>
					<FormGroup>
						<Label for="addressLine1">Address</Label>
						<Input type="text" ref="addressLine1" name="addressLine1" id="addressLine1" placeholder={this.props.user.userAddress1}/>
					</FormGroup>

					<FormGroup>
						<Label for="addressLine2">Address 2</Label>
						<Input type="text" ref="addressLine2" name="addressLine2" id="addressLine2" placeholder={this.props.user.userAddress2}/>
					</FormGroup>

					<Row form>
						<Col md={6}>
							<FormGroup>
								<Label for="city">City</Label>
								<Input type="text" ref="city" name="city" id="city" placeholder={this.props.user.city}/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label for="state">State</Label>
								<Input type="text" ref="state" name="state" id="state" placeholder={this.props.user.state}/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label for="zip">Zip</Label>
								<Input type="number" ref="zip" name="zip" id="zip" placeholder={this.props.user.zip}/>
							</FormGroup>
						</Col>
					</Row>

					<br/>
					<Button>Post Job</Button>
				</Form>
			</React.Fragment>
		);
	}
}

PostJobForm.contextTypes = {
	router: PropTypes.object.isRequired,
};

PostJobForm = ReduxForm.reduxForm({form: 'register'})(PostJobForm);

//make sure user is logged in
PostJobForm = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(PostJobForm);

export default PostJobForm;