import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import Background from '../dogs_background.jpg';
import NavigationBar from 'js/components/Navbar';
import {
	ReactiveBase,
	DataSearch,
	ResultCard } from '@appbaseio/reactivesearch';

const pageStyle = {
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundImage: 'url(' + Background + ')',
	height: '100%',
};
const pageContent = {
	opacity: '0.9',
};

const dateStyle ={
	padding: '5px'
};

class SearchJobPage extends React.Component {

	render() {
		return (
			<div style={pageStyle}>
				<div className='container padded' style={pageContent}>

					<div>
						<NavigationBar/>
					</div>

					<ReactiveBase
						app='job-info'
						url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
					>
						<DataSearch
							componentId='mainSearch'
							dataField={['zip', 'zip.search']}
							queryFormat='and'
							iconPosition='left'
						/>
						<ResultCard
							componentId='results'
							dataField='original_title'
							react={{
								'and': ['mainSearch']
							}}
							onData={(res)=>({
								'image': res.image,
								'title': res.zip,
								'description':  res.id
							})}
						/>

					</ReactiveBase>

				</div>
			</div>
		);
	}
}

SearchJobPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(SearchJobPage);

export default SearchJobPage;
