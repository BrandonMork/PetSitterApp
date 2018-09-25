import * as React from 'react';
import PhoneInput from 'react-phone-number-input/basic-input';

export class PhoneNumberInput extends React.Component {
	state = {
		value: ''
	};

	render() {
		// If `country` property is not passed
		// then "International" format is used.
		return (
			<PhoneInput
				country="US"
				value={ this.state.value }
				onChange={ value => this.setState({ value }) } />
		);
	}
}