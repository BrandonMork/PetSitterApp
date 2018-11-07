import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/utils/Users';
import NavigationBar from 'js/components/Navbar';
import {
    ReactiveBase,
    DataSearch,
    ResultList
} from '@appbaseio/reactivesearch';
import '../../styles/pageStyles.css';
import {Button, Link} from 'reactstrap';
import PropTypes from 'prop-types';
import Cookie from 'universal-cookie';

class SearchJobPage extends React.Component {
    handleReviewJob = res => {
        console.log(res);
        const sitterCookie = new Cookie();
        sitterCookie.set('job', res, {path: '/'});
        let path = '/review-job';
        this.setState({},
            function() {
                return this.context.router.history.push(path);
            });

    };

    render() {
        return (
            <div className="pageContainer">
                <div className='container padded pageContent'>
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
                        <ResultList
                            componentId='results'
                            dataField='original_title'
                            react={{
                                'and': ['mainSearch']
                            }}
                            onData={(res)=>({
                                'title': res.zip,
                                'description': (
                                    <div>
                                        <p>Start Date: {res.startDate}</p>
                                        <p>End Date: {res.endDate}</p>
                                        <Button onClick={ () => this.handleReviewJob(res)}>Review Job</Button>
                                    </div>
                                ),
                            })}
                        />
                    </ReactiveBase>
                </div>
            </div>
        );
    }
}

SearchJobPage.contextTypes = {
    router: PropTypes.object.isRequired,
};

SearchJobPage = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(SearchJobPage);

export default SearchJobPage;