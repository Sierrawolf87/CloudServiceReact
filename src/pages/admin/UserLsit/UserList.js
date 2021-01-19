/* eslint-disable react/prefer-stateless-function */
import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import UserDelete from './Delete/UserDelete';
import UserEdit from './Edit/UserEdit';
import UserListComponent from './UserListComponent';
import UserListFilterComponent from './UserListFilterComponent';

const style = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
});

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEditOpen: false,
      userDeleteOpen: false,
    };
  }

  onCloseDialog(field) {
    this.setState({
      [field]: false,
    });
  }

  onOpenDialog(field) {
    this.setState({
      [field]: true,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <UserListFilterComponent />
        <UserListComponent onOpenDialog={(field) => this.onOpenDialog(field)} />
        <UserEdit
          isOpen={this.state.userEditOpen}
          close={(field) => this.onCloseDialog(field)}
        />
        <UserDelete
          isOpen={this.state.userDeleteOpen}
          close={(field) => this.onCloseDialog(field)}
        />
      </Box>
    );
  }
}

export default withStyles(style)(UserList);
