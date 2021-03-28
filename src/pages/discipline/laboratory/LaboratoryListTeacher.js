/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, CircularProgress, Fab, TextField, withStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { CSCard } from '../../../modules/components/CSCard/CSCard';
import StyledLink from '../../../modules/components/StyledLink/StyledLink';
import { getTeacherLaboratoryList, SetSearchText } from './LaboratorySlice';

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
  fabMargin: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    margin: theme.spacing(1),
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class LaboratoryListTeacher extends React.Component {
  componentDidMount() {
    this.props.getTeacherLaboratoryList(this.props.match.params.id);
  }

  getLabList() {
    const { classes, laboratory } = this.props;
    if (laboratory.studentLaboratoryListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {laboratory.studentLaboratoryList.map((item) => (
            <StyledLink to={`/teacher/discipline/laboratory/${item.laboratory.id}`}>
              <CSCard
                className={classes.labCard}
                key={item.laboratory.id}
                header={item.discipline.name}
                title={item.laboratory.name}
                signature={`Сдано: ${item.solutionsCount}\n\rСредняя отметка: ${item.markAvg}`}
                body={item.requirement != null ? item.requirement : ''}
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
          <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => { this.props.SetSearchText(event.target.value); this.props.getTeacherLaboratoryList(this.props.match.params.id, event.target.value); }} value={laboratory.searchText} />
        </Box>
        <Box className={classes.root}>
          {this.getLabList()}
        </Box>
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

const mapStateToProps = (state) => ({
  laboratory: state.laboratory,
});

const mapDispatchToProps = () => (dispatch) => ({
  getTeacherLaboratoryList: (disciplineId, text) => dispatch(getTeacherLaboratoryList(disciplineId, text)),
  SetSearchText: (text) => dispatch(SetSearchText(text)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LaboratoryListTeacher)));
