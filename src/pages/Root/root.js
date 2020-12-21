/* eslint-disable react/prefer-stateless-function */
import { Box } from '@material-ui/core';
import React from 'react';
import TopAppBar from '../../modules/TopAppBar/TopAppBar';

class Root extends React.Component {
  render() {
    return (
      <Box>
        <TopAppBar />
      </Box>
    );
  }
}

export default Root;
