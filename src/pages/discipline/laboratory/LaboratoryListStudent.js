/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import {
  getStudentLaboratoryList,
} from './LaboratorySlice';
import { CSCard } from '../../../modules/components/CSCard/CSCard';
import StyledLink from '../../../modules/components/StyledLink/StyledLink';

const style = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
  },
  rootBlock: {
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labCard: {
    cursor: 'pointer',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class LaboratoryListStudent extends React.Component {
  componentDidMount() {
    this.props.getStudentLaboratoryList(this.props.match.params.id);
  }

  getLabList() {
    const { classes, laboratory } = this.props;
    if (laboratory.studentLaboratoryListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {laboratory.studentLaboratoryList.map((item) => (
            <StyledLink to={`/student/discipline/laboratory/${item.laboratory.id}`}>
              <CSCard
                className={classes.labCard}
                key={item.laboratory.id}
                header={item.discipline.name}
                title={item.laboratory.name}
                signature={`Отметка: ${item.mark}`}
                body={item.requirement != null ? item.requirement.Description : ''}
              />
            </StyledLink>
          ))}
        </Box>
      );
    }
    return (<Box />);
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.getLabList()}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  laboratory: state.laboratory,
});

const mapDispatchToProps = () => (dispatch) => ({
  getStudentLaboratoryList: (disciplineId) => dispatch(getStudentLaboratoryList(disciplineId)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryListStudent)));
