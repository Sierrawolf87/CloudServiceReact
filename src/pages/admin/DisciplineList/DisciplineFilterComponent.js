/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { getDisciplineList, getUserList } from './DisciplineListSlice';

const style = () => ({
  root: {
    width: '95vw',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10px',
  },
  roleSelect: {
    margin: '10px',
    width: '180px',
  },
});

class DisciplineListFilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      ownerId: '',
    };
    this.props.getUserList();
    this.props.getDisciplineList();
  }

  ownerSelect() {
    const { classes } = this.props;
    if (this.props.disciplineList.userListData) {
      const { userListData } = this.props.disciplineList;
      return (
        <Autocomplete
          className={classes.roleSelect}
          id="ownerFilter"
          autoHighlight
          options={userListData}
          getOptionLabel={(option) => `${option.userName} - ${option.initials}`}
          renderInput={(params) => <TextField {...params} label="Владелец" />}
          onChange={(event, option) => {
            if (option) {
              this.setState({ ownerId: option.id });
              this.props.getDisciplineList(this.state.search, option.id, this.props.disciplineList.nextPage);
            }
          }}
        />
      );
    }
    return (
      <div />
    );
  }

  OnChangeInputSearch(e) {
    this.setState({
      search: e.target.value,
    });
    this.props.getDisciplineList(e.target.value, this.state.ownerId, this.props.disciplineList.nextPage);
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => this.OnChangeInputSearch(event)} value={this.state.search} />
        {this.ownerSelect()}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  disciplineList: state.disciplineList,
});

const mapDispatchToProps = () => (dispatch) => ({
  getUserList: () => dispatch(getUserList()),
  getDisciplineList: (text, ownerid, page, size) => dispatch(getDisciplineList(text, ownerid, page, size)),
});

export default withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisciplineListFilterComponent));
