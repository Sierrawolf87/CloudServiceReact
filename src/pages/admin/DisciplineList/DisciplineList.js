/* eslint-disable react/prefer-stateless-function */
import { Box, withStyles } from '@material-ui/core';
import React from 'react';
import DisciplineListComponent from './DisciplineListComponent';
import DisciplineListFilterComponent from './DisciplineFilterComponent';

const style = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
});

class DisciplineList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <DisciplineListFilterComponent />
        <DisciplineListComponent />
      </Box>
    );
  }
}

export default withStyles(style)(DisciplineList);
