/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { getRoleList, getGroupList, getSearchList } from './UserListSlice';

const style = () => ({
  root: {
    width: '95vw',
    height: '60px',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10px',
  },
  roleSelect: {
    width: '180px',
  },
});

class UserListFilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      role: '',
      group: '',
    };
    this.props.getRoleList();
    this.props.getGroupList();
  }

  roleSelect() {
    const { classes } = this.props;
    const { userRoleData } = this.props.userList;
    if (this.props.userList.userRoleData) {
      return (
        <Autocomplete
          className={classes.roleSelect}
          id="roleFilter"
          autoHighlight
          options={userRoleData}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Роль" />}
          onChange={(event, option) => {
            if (option) {
              this.setState({ role: option.id });
              this.props.getSearchList(this.state.search, this.state.role, this.state.group);
            }
          }}
        />
      );
    }
    return (
      <div />
    );
  }

  groupSelect() {
    const { classes } = this.props;
    if (this.props.userList.userGroupData) {
      const { userGroupData } = this.props.userList;
      return (
        <Autocomplete
          className={classes.roleSelect}
          id="groupFilter"
          autoHighlight
          options={userGroupData}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Группа" />}
          onChange={(event, option) => {
            if (option) {
              this.setState({ group: option.id });
              this.props.getSearchList(this.state.search, this.state.role, this.state.group);
            }
          }}
        />
      );
    }
    return (
      <div />
    );
  }

  OnChangeInputs(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.getSearchList(this.state.search, this.state.role, this.state.group);
  }

  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.roleSelect()}
        <TextField id="search" label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => this.OnChangeInputs(event)} value={this.state.search} />
        {this.groupSelect()}
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.userList,
});

const mapDispatchToProps = () => (dispatch) => ({
  getRoleList: () => dispatch(getRoleList()),
  getGroupList: () => dispatch(getGroupList()),
  getSearchList: (text, role, group) => dispatch(getSearchList(text, role, group)),
});

export default withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListFilterComponent));
