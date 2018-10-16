import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import * as ReduxForm from 'redux-form';

class AvailabilityForm extends Component {
	constructor() {
		super();

		this.state = {
	  	showMenu: false,
		};

		this.showMenu = this.showMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	showMenu(event) {
		event.preventDefault();

		this.setState({ showMenu: true }, () => {
	  		document.addEventListener('click', this.closeMenu);
		});
	}

	closeMenu(event) {

		if (!this.dropdownMenu.contains(event.target)) {

			this.setState({showMenu: false}, () => {
				document.removeEventListener('click', this.closeMenu);
			});
		}
	}

	render() {
		return (
			<div>
			<button onClick={this.showMenu}>
			  Time Slots
			</button>

			{
				this.state.showMenu
					? (
						<div
							className="menu"
							ref={(element) => {
								this.dropdownMenu = element;
							}}
						>
							<button> Monday </button>
							<button> Tuesday </button>
							<button> Wednesday </button>
							<button> Thursday </button>
							<button> Friday </button>
							<button> Saturday </button>
							<button> Sunday </button>
				  		</div>) : (null)
			}
		  </div>
		);
	}
}

AvailabilityForm = ReduxForm.reduxForm({form: 'availability'})(AvailabilityForm);

AvailabilityForm = connect(
	state => ({
	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(AvailabilityForm);

export default AvailabilityForm;