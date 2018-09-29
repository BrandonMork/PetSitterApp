import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from 'js/components/CustomDropdown/CustomDropdown.js';
import Button from 'js/components/CustomButtons/Button.js';

import headerLinksStyle from 'js/assets/jss/material-kit-react/components/headerLinksStyle.js';

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText='Components'
          buttonProps={{
            className: classes.navLink,
            color: 'transparent'
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to='/' className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href='https://creativetimofficial.github.io/material-kit-react/#/documentation'
              target='_blank'
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href='https://www.creative-tim.com/product/material-kit-react'
          color='transparent'
          target='_blank'
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
