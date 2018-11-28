import React from 'react';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import { Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

class DropDownForRating extends React.Component {
	constructor(props){
		super(props);
		/*this.toggle = this.toggle.bind(this);*/
		this.select = this.select.bind(this);
		this.state = {
			value: 'Select a Rating',
			shown: 'False',
			user: props.user
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
					<Button> Submit </Button>
					</div>
				}
			</div>
		);
	}

}

DropDownForRating = connect(
	state => ({

	})
)(DropDownForRating);

export default DropDownForRating;