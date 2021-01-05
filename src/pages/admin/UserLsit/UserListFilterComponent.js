/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, TextField, withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { getRoleList, getGroupList, getUserList } from './UserListSlice';

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
/*   '@media (max-width:600px)': {
    roleSelect: {
      width: '130px',
    },
  }, */
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
              this.props.getUserList(this.state.search, option.id, this.state.group, this.props.userList.nextPage);
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
              this.props.getUserList(this.state.search, this.state.role, option.id, this.props.userList.nextPage);
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
    this.props.getUserList(e.target.value, this.state.role, this.state.group, this.props.userList.nextPage);
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.roleSelect()}
        <TextField id="search" className={classes.roleSelect} label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => this.OnChangeInputSearch(event)} value={this.state.search} />
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
  getUserList: (text, role, group, page, size) => dispatch(getUserList(text, role, group, page, size)),
});

export default withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListFilterComponent));
