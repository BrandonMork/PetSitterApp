import React from 'react';
import NavigationBar from 'js/components/Navbar';

class ReportingPage extends React.Component {
	render() {
		return (
            <div className='pageContainer'>
                <div className='container padding'>
                    <div className='pageContent'>
                        <div>
                            <NavigationBar/>
                        </div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReportingPage;