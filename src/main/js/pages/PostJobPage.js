import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody} from 'reactstrap';
import NavigationBar from 'js/components/Navbar';
import Background from '../../resources/images/dogs_background.jpg';
import {postJob} from 'js/utils/Users';

const center = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};
const pageStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + Background + ')',
    overflow: 'hidden',
    height: '100%',
};
const pageContent = {
    opacity: '0.9',
};

class PostJobPage extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ updatedJob: {
				id: 123123
			}}, function() {
			postJob(this.state.updatedJob);
		});
	}
    render() {
        return (
            <div style={pageStyle}>
                <div style={pageContent}>
                    <div>
                        <NavigationBar/>
                    </div>
                    <br/>
                    <div style={center}>
                        <Col sm="8">
                            <Card>
                                <br/>
                                <CardTitle style={center}>Job Posting Form</CardTitle>
                            </Card>
                        </Col>
                    </div>
                </div>
				<div style={center}>
					<Col md="10">
						<Card>
							<br/>
							<CardTitle style={center}>Submit any changes below.</CardTitle>
							<CardBody>
								<Form name="form" onSubmit={this.handleSubmit.bind(this)}>
									<Row form>
										<Col md={12}>
											<FormGroup>
												<Label for="principal">Email</Label>
												<Input type="principal" ref="principal" name="principal" id="principal" />
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md={4}>
											<FormGroup>
												<Label for="firstName">First Name</Label>
												<Input type="text" ref="firstName" name="firstName" id="firstName"  />
											</FormGroup>
										</Col>
										<Col md={4}>
											<FormGroup>
												<Label for="middleName">Middle Name</Label>
												<Input type="text" ref="firstName" name="middleName" id="middleName" />
											</FormGroup>
										</Col>
										<Col md={4}>
											<FormGroup>
												<Label for="lastName">Last Name</Label>
												<Input type="text" ref="lastName" name="lastName" id="lastName"  />
											</FormGroup>
										</Col>
									</Row>

									<FormGroup>
										<Label for="addressLine1">Address</Label>
										<Input type="text" ref="addressLine1" name="addressLine1" id="addressLine1" />
									</FormGroup>

									<FormGroup>
										<Label for="addressLine2">Address 2</Label>
										<Input type="text" ref="addressLine2" name="addressLine2" id="addressLine2" />
									</FormGroup>

									<Row form>
										<Col md={6}>
											<FormGroup>
												<Label for="city">City</Label>
												<Input type="text" ref="city" name="city" id="city" />
											</FormGroup>
										</Col>
										<Col md={4}>
											<FormGroup>
												<Label for="state">State</Label>
												<Input type="text" ref="state" name="state" id="state" />
											</FormGroup>
										</Col>
										<Col md={2}>
											<FormGroup>
												<Label for="zip">Zip</Label>
												<Input type="text" ref="zip" name="zip" id="zip" />
											</FormGroup>
										</Col>
									</Row>

									<FormGroup>
										<Label for="phoneNumber">Phone Number</Label>
										<Input type="text" ref="phoneNumber" name="phoneNumber" id="phoneNumber" />
									</FormGroup>

									<FormGroup>
										<Label for="type">User Type</Label>
										<Input type="text" ref="type" name="type" id="type" />
									</FormGroup>

									<br/>
									<Button>Submit Changes</Button>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</div>
            </div>
        );
    }
}

export default PostJobPage;