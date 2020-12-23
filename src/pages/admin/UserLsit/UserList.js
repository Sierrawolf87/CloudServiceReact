/* eslint-disable react/prefer-stateless-function */
import { Box } from '@material-ui/core';
import React from 'react';
import UserListComponent from './UserListComponent';

class UserList extends React.Component {
  render() {
    return (
      <Box>
        <UserListComponent />
      </Box>
    );
  }
}

export default UserList;
