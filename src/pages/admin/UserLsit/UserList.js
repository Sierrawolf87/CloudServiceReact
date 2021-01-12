/* eslint-disable react/prefer-stateless-function */
import { Box, withStyles } from '@material-ui/core';
import React from 'react';
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
      selecredId: '',
    };
  }

  onCloseDialog(field) {
    this.setState({
      [field]: false,
    });
  }

  onOpenDialog(field, id) {
    this.setState({
      [field]: true,
      selecredId: id,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <UserListFilterComponent />
        <UserListComponent onOpenDialog={(field, id) => this.onOpenDialog(field, id)} />
        <UserEdit
          isOpen={this.state.userEditOpen}
          id={this.state.selecredId}
          close={(field) => this.onCloseDialog(field)}
        />
      </Box>
    );
  }
}

export default withStyles(style)(UserList);
