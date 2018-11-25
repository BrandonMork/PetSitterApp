import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  ...customSelectStyle
};

class Step3 extends React.Component {

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

  isValidated() {
    return true;
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Where's your crib?</h4>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            labelText="Address"
            id="streetname"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
          <CustomInput
            labelText="Apt #"
            id="streetno"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={7}>
          <CustomInput
            labelText="City"
            id="city"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={3}>
			<CustomInput
				labelText="State"
				id="state"
				formControlProps={{
					fullWidth: true
				}}
			/>
        </GridItem>
		  <GridItem xs={12} sm={10}>
			  <CustomInput
				  labelText="Phone"
				  id="phone"
				  formControlProps={{
					  fullWidth: true
				  }}
				  inputProps={{
					  type: "number"
				  }}
			  />
		  </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step3);
