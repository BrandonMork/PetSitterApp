import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
      this.state = {
        cardAnimaton: "cardHidden",

        // login form
        loginEmail: "",
        loginEmailState: "",
        loginPassword: "",
        loginPasswordState: "",
      };
      this.loginClick = this.loginClick.bind(this);
  }

    // function that returns true if value is email, false otherwise
    verifyEmail(value) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRex.test(value);
    }

    // function that verifies if a string has a given length or not
    verifyLength(value, length) {
        return value.length >= length;
    }

    change(event, stateName, type) {
        switch (type) {
            case "email":
                if (this.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "password":
                if (this.verifyLength(event.target.value, 1)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    loginClick() {
        if (this.state.loginEmailState === "") {
            this.setState({ loginEmailState: "error" });
        }
        if (this.state.loginPasswordState === "") {
            this.setState({ loginPasswordState: "error" });
        }
    }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">

            <GridItem xs={12} sm={12} md={6} lg={4}>
                <Card login className={classes[this.state.cardAnimaton]}>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <MailOutline />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Login Form</h4>
                    </CardHeader>
                    <CardBody>
                        <form>
                            <CustomInput
                                success={this.state.loginEmailState === "success"}
                                error={this.state.loginEmailState === "error"}
                                labelText="Email Address *"
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "loginEmail", "email"),
                                    type: "email"
                                }}
                            />
                            <CustomInput
                                success={this.state.loginPasswordState === "success"}
                                error={this.state.loginPasswordState === "error"}
                                labelText="Password *"
                                id="password"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: event =>
                                        this.change(event, "loginPassword", "password"),
                                    type: "password"
                                }}
                            />
                            <div className={classes.formCategory}>
                                <small>*</small> Required fields
                            </div>
                            <div className={classes.center}>
                                <Button color="rose" onClick={this.loginClick}>
                                    Login
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
