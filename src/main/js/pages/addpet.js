import React from 'react';

import { Card, CardBody, Col } from 'reactstrap';
import * as Bessemer from 'js/alloy/bessemer/components';
import handleSubmit from 'redux-form/es/handleSubmit';
import * as ReduxForm from 'redux-form';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/users';
import {AddPetForm} from 'js/components/addpetform';
import axios from 'axios';

class AddPetPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {

		let form = <AddPetForm/>;

		let { handleSubmit } = this.props;

		return (
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<Col sm="5">
					<Card>
						<CardBody>
							{form}
						</CardBody>
					</Card>
				</Col>
			</div>
		);
	}
}

export default AddPetPage;