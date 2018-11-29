import React from 'react';
import _ from 'lodash';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../utils/Users';
import {Button, Card, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import uuidv4 from 'uuid/v4';
import Cookie from 'universal-cookie';
import {getSitterInfo} from '../utils/Users';
import PropTypes from 'prop-types';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import * as Validation from 'js/alloy/utils/validation';
import DropDownForRating from '../components/DropDownForRating.js';
import ReviewPage from './ReviewPage.js';

class MainReviewPage extends React.Component {

    constructor(props){
        super(props);
        /*this.toggle = this.toggle.bind(this);*/
        //this.select = this.select.bind(this);
        this.state = {
            jobs: []
        };
    }


    render() {
        return (
            <div style={{marginTop: 80, marginBottom: 30}}>
                <ReactiveBase
                    app='job-info'
                    url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
                >
                    <ReactiveList
                        componentId='results'
                        dataField='Jobs'
                        showResultStats={false}
                        size={500}
                        onData={(res) =>
                            <React.Fragment key={uuidv4()}>
                                {this.state.jobs.push(res)}
                            </React.Fragment>
                        }
                    />
                </ReactiveBase>
                {console.log(this.state.jobs)}
                <div>
                    /*Testing some different methods for passing in a job at time, doesn't seem to like the whole array at once*/
                    {this.state.jobs.map((job) => <ReviewPage job={job}/>)}
                </div>
            </div>

        );
    }
}

MainReviewPage.contextTypes = {
    router: PropTypes.object.isRequired,
};

MainReviewPage = connect(
    state => ({
        //authentication: Users.State.getAuthentication(state),
        //user: Users.State.getUser(state)
    })
)(MainReviewPage);

export default MainReviewPage;