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
import PetList from 'js/components/PetList';

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

    onSubmit = () => {

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

DropDownForRating.contextTypes = {
    //router: PropTypes.object.isRequired,
};

DropDownForRating = connect(
    state => ({})
)(DropDownForRating);

export default DropDownForRating;