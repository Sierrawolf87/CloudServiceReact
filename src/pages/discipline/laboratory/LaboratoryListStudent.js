/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, CircularProgress, TextField, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import {
  getStudentLaboratoryList, SetSearchText,
} from './LaboratorySlice';
import { CSCard } from '../../../modules/components/CSCard/CSCard';
import StyledLink from '../../../modules/components/StyledLink/StyledLink';

const style = (theme) => ({
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
  mainBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterBlock: {
    width: '95vw',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10px',
  },
  labCard: {
    cursor: 'pointer',
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class LaboratoryListStudent extends React.Component {
  componentDidMount() {
    this.props.getStudentLaboratoryList(this.props.match.params.id);
  }

  getCsCardColorClass(mark) {
    const { classes } = this.props;
    if (mark <= 3) { return classes.error; }
    if (mark <= 7) { return classes.warning; }
    if (mark <= 10) { return classes.success; }
    return classes.error;
  }

  getLabList() {
    const { classes, laboratory } = this.props;
    if (laboratory.studentLaboratoryListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {laboratory.studentLaboratoryList.map((item) => (
            <StyledLink to={`/student/discipline/laboratory/${item.laboratory.id}`}>
              <CSCard
                className={`${classes.labCard} ${this.getCsCardColorClass(item.mark)}`}
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
    return (<CircularProgress />);
  }

  render() {
    const { classes, laboratory } = this.props;
    return (
      <Box className={classes.mainBlock}>
        <Box className={classes.filterBlock}>
          <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => { this.props.SetSearchText(event.target.value); this.props.getStudentLaboratoryList(this.props.match.params.id, event.target.value); }} value={laboratory.searchText} />
        </Box>
        <Box className={classes.root}>
          {this.getLabList()}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  laboratory: state.laboratory,
});

const mapDispatchToProps = () => (dispatch) => ({
  getStudentLaboratoryList: (disciplineId, text) => dispatch(getStudentLaboratoryList(disciplineId, text)),
  SetSearchText: (text) => dispatch(SetSearchText(text)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryListStudent)));
