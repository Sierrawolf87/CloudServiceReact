/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, CircularProgress, Fab, TextField, withStyles,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';

import { CSCard } from '../../modules/components/CSCard/CSCard';
import StyledLink from '../../modules/components/StyledLink/StyledLink';
import { getTeacherDisciplineList, SetSearchText } from './DisciplineSliсe';

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
  dispCard: {
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
class DisciplineListTeacher extends React.Component {
  componentDidMount() {
    this.props.getTeacherDisciplineList();
  }

  getLDispList() {
    const { classes, discipline } = this.props;
    if (discipline.disciplineListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {discipline.disciplineList.map((item) => (
            <StyledLink to={`/teacher/discipline/${item.discipline.id}`}>
              <CSCard
                className={classes.dispCard}
                key={item.discipline.id}
                header={item.discipline.name}
                title={item.discipline.shortName}
                signature={item.group.name}
                body=""
              />
            </StyledLink>
          ))}
        </Box>
      );
    }
    return (<CircularProgress />);
  }

  render() {
    const { classes, discipline } = this.props;
    return (
      <Box>
        <Box className={classes.mainBlock}>
          <Box className={classes.filterBlock}>
            <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => { this.props.SetSearchText(event.target.value); this.props.getTeacherDisciplineList(event.target.value); }} value={discipline.searchText} />
          </Box>
          <Box className={classes.root}>
            {this.getLDispList()}
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
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  discipline: state.discipline,
});

const mapDispatchToProps = () => (dispatch) => ({
  getTeacherDisciplineList: (text) => dispatch(getTeacherDisciplineList(text)),
  SetSearchText: (text) => dispatch(SetSearchText(text)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisciplineListTeacher)));
