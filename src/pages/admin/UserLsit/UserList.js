/* eslint-disable react/prefer-stateless-function */
import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import UserListComponent from './UserListComponent';
import UserListFilterComponent from './UserListFilterComponent';

const style = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class UserList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <UserListFilterComponent />
        <UserListComponent />
      </Box>
    );
  }
}

export default withStyles(style)(UserList);
