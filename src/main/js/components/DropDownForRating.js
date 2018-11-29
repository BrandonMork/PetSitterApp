import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';
import {Button, Card, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';

class DropDownForRating extends React.Component {
    constructor(props){
        super(props);
        this.select = this.select.bind(this);
        this.state = {
            value: 'Select a Rating',
            shown: 'False',
            user: props
        };
    }

	select(event){
		this.setState({
			value: event.target.innerText
		});
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		this.setState({
			shown: 'True'
		});
	};

    submitRating = (e) => {
        e.preventDefault();
        console.log('This is my current state');
        console.log(this.state.user.user);

        let ratedUser = {
            'principal': this.state.user.user.principal,
            'firstName': this.state.user.user.firstName,
            'middleName': this.state.user.user.middleName,
            'lastName': this.state.user.user.lastName,
            'addressLine1': this.state.user.user.addressLine1,
            'addressLine2': this.state.user.user.addressLine2,
            'city': this.state.user.user.city,
            'state': this.state.user.user.state,
            'zip': this.state.user.user.zip,
            'phoneNumber': this.state.user.user.phoneNumber,
            'pets': [],
            'roles': [
                'ROLE_USER',
            ],
            'userType': this.state.user.user.userType,
            'momento': this.state.user.user.principal,
            'password': this.state.user.user.password,
            'sumRatings': this.state.user.user.sumRatings + this.state.value.length,
            'numRatings': this.state.user.user.numRatings + 1
        };


        console.log(ratedUser);
        //addRating(ratedUser);
        this.setState({
            shown: 'False'
        });
    };

    render(){
        return(
            <div>
                <Button onClick={(e) => this.handleSubmit(e)}> Rate Sitter </Button>
                <br/>
                {_.isEqual(this.state.shown, 'True') &&
                <div>
                    <br/>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            {this.state.value}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.select}>★</DropdownItem>
                            <DropdownItem onClick={this.select}>★★</DropdownItem>
                            <DropdownItem onClick={this.select}>★★★</DropdownItem>
                            <DropdownItem onClick={this.select}>★★★★</DropdownItem>
                            <DropdownItem onClick={this.select}>★★★★★</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <br/>
                    <Button onClick={(e) => this.submitRating(e)}> Submit </Button>
                </div>
                }
            </div>
        );
    }

}

DropDownForRating = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user)),
        //getUserDetails: () => dispatch(Users.Actions.getUserDetails())
    })
)(DropDownForRating);

export default DropDownForRating;