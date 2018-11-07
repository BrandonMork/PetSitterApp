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
import {Button} from 'reactstrap';
import Cookie from 'universal-cookie';
import {Card, CardBody, CardTitle, Col} from 'reactstrap';

class ReviewJobPage extends React.Component {
    handleReviewJob = job => {
        console.log(job);
    };

    render() {
        const myCookie = new Cookie();
        console.log(myCookie.get('job').id.valueOf());
        return (
            <div className="pageContainer">
                <div className='container padded pageContent'>
                    <div>
                        <NavigationBar/>
                    </div>
                    <React.Fragment>
                        <Col sm='8'>
                            <Card>
                                <br/>
                                <CardTitle>{'ID of Owner: ' + myCookie.get('job').id.valueOf()}</CardTitle>
                                <CardBody>
                                    <br/>
                                    <br/>
                                    <Button>Accept Job</Button>
                                    <br/>
                                </CardBody>
                            </Card>
                        </Col>
                        <br/>
                    </React.Fragment>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

ReviewJobPage = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(ReviewJobPage);

export default ReviewJobPage;