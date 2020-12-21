/* eslint-disable react/prefer-stateless-function */
import { Box } from '@material-ui/core';
import React from 'react';
import TopAppBar from '../../../modules/TopAppBar/TopAppBar';
import UserListComponent from './UserListComponent';

class UserList extends React.Component {
  render() {
    return (
      <Box>
        <TopAppBar />
        <UserListComponent />
      </Box>
    );
  }
}

export default UserList;
