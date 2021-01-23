/* eslint-disable react/prefer-stateless-function */
import { Box, Fab, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import UserCreate from './Creact/UserCreate';
import UserDelete from './Delete/UserDelete';
import UserEdit from './Edit/UserEdit';
import UserListComponent from './UserListComponent';
import UserListFilterComponent from './UserListFilterComponent';

const style = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
  fabMargin: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    margin: theme.spacing(1),
  },
  fabExtendedIcon: {
    marginRight: theme.spacing(1),
  },
});

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCreateOpen: false,
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
        <UserCreate
          isOpen={this.state.userCreateOpen}
          close={(field) => this.onCloseDialog(field)}
        />
        <UserEdit
          isOpen={this.state.userEditOpen}
          close={(field) => this.onCloseDialog(field)}
        />
        <UserDelete
          isOpen={this.state.userDeleteOpen}
          close={(field) => this.onCloseDialog(field)}
        />
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="create"
          className={classes.fabMargin}
          onClick={() => this.onOpenDialog('userCreateOpen')}
        >
          <Add className={classes.fabExtendedIcon} />
          Создать
        </Fab>
      </Box>
    );
  }
}

export default withStyles(style)(UserList);
