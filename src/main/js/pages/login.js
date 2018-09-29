import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';

// @material-ui/icons
import Email from '@material-ui/icons/Email';

// core components
import Header from 'js/components/Header/Header.js';
import HeaderLinks from 'js/components/Header/HeaderLinks.js';
import Footer from 'js/components/Footer/Footer.js';
import GridContainer from 'js/components/Grid/GridContainer.js';
import GridItem from 'js/components/Grid/GridItem.js';
import Button from 'js/components/CustomButtons/Button.js';
import Card from 'js/components/Card/Card.js';
import CardBody from 'js/components/Card/CardBody.js';
import CardHeader from 'js/components/Card/CardHeader.js';
import CardFooter from 'js/components/Card/CardFooter.js';
import CustomInput from 'js/components/CustomInput/CustomInput.js';

// bg image for login page
import image from 'js/assets/img/bg7.jpg';
import loginPageStyle from 'js/assets/jss/material-kit-react/views/loginPage.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import * as Validation from 'js/alloy/utils/validation';
import {cardHeader} from 'js/assets/jss/material-kit-react';

library.add(faLockOpen);

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		// we use this to make the card to appear after the page has been rendered
		this.state = {
			cardAnimation: 'cardHidden'
		};
	}

	componentDidMount() {
		// we add a hidden class to the card and after 700 ms we delete it and the transition appears
		setTimeout(
			function() {
				this.setState({ cardAnimation: '' });
			}.bind(this),
			700
		);
	}

	render() {
		const { classes, ...rest } = this.props;
		return (
			<div>
				<Header
					absolute
					color='transparent'
					brand='Tempeturs'
					rightLinks={<HeaderLinks />}
					{...rest}
				/>
				<div
					className={classes.pageHeader}
					style={{
						backgroundImage: 'url(' + image + ')',
						backgroundSize: 'cover',
						backgroundPosition: 'top center'
					}}
				>
					<div className={classes.container}>
						<GridContainer justify='center'>
							<GridItem xs={12} sm={12} md={4}>
								<Card className={classes[this.state.cardAnimation]}>
									<form className={classes.form}>
										<CardHeader color='primary' className={cardHeader}>
											<h4>Login</h4>
										</CardHeader>
										<CardBody>
											<CustomInput
												labelText='Email Address'
												id='email'
												validators={[Validation.requiredValidator, Validation.emailValidator]}
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													type: 'email',
													endAdornment: (
														<InputAdornment position='end'>
															<Email className={classes.inputIconsColor} />
														</InputAdornment>
													)
												}}
											/>
											<CustomInput
												labelText='Password'
												id='pass'
												validators={[Validation.requiredValidator, Validation.passwordValidator]}
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{
													type: 'password',
													endAdornment: (
														<InputAdornment position='end'>
															<FontAwesomeIcon icon="lock-open"/>
														</InputAdornment>
													)
												}}
											/>
										</CardBody>
										<CardFooter className={classes.cardFooter}>
											<Button submit color='primary' size='lg'>
												Get started
											</Button>
										</CardFooter>
									</form>
								</Card>
							</GridItem>
						</GridContainer>
					</div>
					<Footer whiteFont />
				</div>
			</div>
		);
	}
}

export default withStyles(loginPageStyle)(LoginPage);