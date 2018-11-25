import React from "react";
import PropTypes from "prop-types";
import * as ReduxForm from 'redux-form';
import * as Users from '../../utils/Users';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import CardTravel from "@material-ui/icons/CardTravel";
import Gesture from "@material-ui/icons/Gesture";
import HotTub from "@material-ui/icons/HotTub";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import Step1 from '../Forms/WizardSteps/Step1';
import Step2 from '../Forms/WizardSteps/Step2';
import Step3 from '../Forms/WizardSteps/Step3';

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";


class RegisterPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// register form
			registerEmail: "",
			registerEmailState: "",
			registerPassword: "",
			registerPasswordState: "",
			registerConfirmPassword: "",
			registerConfirmPasswordState: "",
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.registerClick = this.registerClick.bind(this);
	}

	// function that returns true if value is email, false otherwise
	verifyEmail(value) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRex.test(value);
	}

	// function that verifies if a string has a given length or not
	verifyLength(value, length) {
		return value.length >= length;
	}

	// function that verifies if two strings are equal
	compare(string1, string2) {
		if (string1 === string2) {
			return true;
		}
		return false;
	}

	registerClick() {
		/* @TODO Put error notification */
		if (this.state.registerEmailState === "") {
			this.setState({ registerEmailState: "error" });
		}
		if (this.state.registerPasswordState === "") {
			this.setState({ registerPasswordState: "error" });
		}
		if (this.state.registerConfirmPasswordState === "") {
			this.setState({ registerConfirmPasswordState: "error" });
		}
		if (this.state.registerCheckboxState === "") {
			this.setState({ registerCheckboxState: "error" });
		}

		console.log(this.state.registerEmail.valueOf());
		console.log(this.state.registerPassword.valueOf());
		console.log(this.state.registerConfirmPassword.valueOf());

		if (this.props.register(
			this.state.registerEmail.valueOf(),
			this.state.registerPassword.valueOf())) {
			/* @TODO Redirect to home after successful login */
			console.log("You're logged in!");
		} else {
			console.log('Error! Email or password does not exist.');
		}
	}

	change(event, stateName, type, stateNameEqualTo) {
		switch (type) {
			case "email":
				if (this.verifyEmail(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" });
					this.setState({loginEmail: event.target.value});
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			case "password":
				if (this.verifyLength(event.target.value, 1)) {
					this.setState({ [stateName + "State"]: "success" });
					this.setState({loginPassword: event.target.value});
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			case "password-confirmation":
				if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
					this.setState({ [stateName + "State"]: "success" });
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			default:
				break;
		}
	}

	handleSubmit(event) {
		console.log("Form submitted");
		event.preventDefault();
		//this.props.register(user);
	};

  handleToggle(value) {
	const { checked } = this.state;
	const currentIndex = checked.indexOf(value);
	const newChecked = [...checked];

	if (currentIndex === -1) {
	  newChecked.push(value);
	} else {
	  newChecked.splice(currentIndex, 1);
	}

	this.setState({
	  checked: newChecked
	});
  }

  render() {
	const { classes } = this.props;

	  return (
	  <div className={classes.container}>

		<GridContainer justify="center">
		  <GridItem xs={12} sm={12} md={12}>

			  <GridContainer justify="center">

				  <GridItem xs={12} sm={10} md={6}>
					  <Card className={classes.cardSignup}>
						  <h2 className={classes.cardTitle}>What do we offer?</h2>
						  <CardBody>
							  <GridContainer justify="center">
								  <GridItem xs={12} sm={12} md={10}>

									  <InfoArea
										  title="Pet Boarding"
										  description="Puuurrrfect if you need overnight pet care. Sessions can last multiple nights."
										  icon={CardTravel}
										  iconColor="rose"
									  />
									  <InfoArea
										  title="Pet Walking & Drop-In Visits"
										  description="Whenever you pet is feeling lonely. For check-ins and play dates throughout the day."
										  icon={Gesture}
										  iconColor="primary"
									  />
									  <InfoArea
										  title="Pet Day Care"
										  description="Daytime pet care in your sitter's pet-friendly home. Grouped with other pets so nobody gets lonely."
										  icon={HotTub}
										  iconColor="info"
									  />
								  </GridItem>
							  </GridContainer>
						  </CardBody>
					  </Card>
				  </GridItem>

				  <GridItem xs={12} sm={10} md={6}>
					  <Wizard
						  validate
						  steps={[
							  { stepName: "Register", stepComponent: Step1, stepId: "about" },
							  { stepName: "User Type", stepComponent: Step2, stepId: "account" },
							  { stepName: "Details", stepComponent: Step3, stepId: "address" }
						  ]}
						  title="Create Your Profile"
						  subtitle="Gain access to our premier pet sitter matching services."
					  />
				  </GridItem>

			  </GridContainer>

		  </GridItem>
		</GridContainer>
	  </div>
	);
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

RegisterPage = ReduxForm.reduxForm({form: 'register'})(RegisterPage);

RegisterPage = connect(
	state => ({

	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegisterPage);


export default withStyles(registerPageStyle)(RegisterPage);
