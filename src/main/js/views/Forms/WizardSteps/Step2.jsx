import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choice: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      desgin: false,
      code: false,
      develop: false
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>What are you doing? (checkboxes)</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={6}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("owner")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-pencil-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-pencil-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Owner</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("sitter")}
                    checkedIcon={
                      <i
                        className={"fas fa-laptop " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-laptop " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Sitter</h6>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(style)(Step2);
