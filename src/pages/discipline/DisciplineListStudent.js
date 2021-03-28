/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box, CircularProgress, TextField, withStyles,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';

import { CSCard } from '../../modules/components/CSCard/CSCard';
import StyledLink from '../../modules/components/StyledLink/StyledLink';
import { getStudentDisciplineList, SetSearchText } from './DisciplineSliсe';

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
});

// eslint-disable-next-line react/prefer-stateless-function
class DisciplineListStudent extends React.Component {
  componentDidMount() {
    this.props.getStudentDisciplineList();
  }

  getLDispList() {
    const { classes, discipline } = this.props;
    if (discipline.disciplineListLoading === false) {
      return (
        <Box className={classes.rootBlock}>
          {discipline.disciplineList.map((item) => (
            <StyledLink to={`/student/discipline/${item.id}`}>
              <CSCard
                className={classes.dispCard}
                key={item.id}
                header={item.name}
                title={item.shortName}
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
      <Box className={classes.mainBlock}>
        <Box className={classes.filterBlock}>
          <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => { this.props.SetSearchText(event.target.value); this.props.getStudentDisciplineList(event.target.value); }} value={discipline.searchText} />
        </Box>
        <Box className={classes.root}>
          {this.getLDispList()}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  discipline: state.discipline,
});

const mapDispatchToProps = () => (dispatch) => ({
  getStudentDisciplineList: (text) => dispatch(getStudentDisciplineList(text)),
  SetSearchText: (text) => dispatch(SetSearchText(text)),
});

export default withSnackbar(withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisciplineListStudent)));
