import {
  Box, FormControl, InputLabel, MenuItem, Select, TextField, withStyles,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getRoleList, getGroupList } from './UserListSlice';

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
    if (this.props.userList.userRoleData) {
      return (
        <FormControl>
          <InputLabel id="userListFilterRoleSelectLabel">Роль</InputLabel>
          <Select
            className={classes.roleSelect}
            labelId="userListFilterRoleSelectLabel"
            id="roleFilter"
            name="role"
            value={this.state.role}
            onChange={(event) => this.OnChangeInputs(event)}
          >
            <MenuItem selected value="all">Все</MenuItem>
            {this.props.userList.userRoleData.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      );
    }
    return (
      <div />
    );
  }

  groupSelect() {
    const { classes } = this.props;
    if (this.props.userList.userGroupData) {
      return (
        <FormControl>
          <InputLabel id="userListFilterGroupSelectLabel">Группа</InputLabel>
          <Select
            className={classes.roleSelect}
            labelId="userListFilterGroupSelectLabel"
            id="GroupFilter"
            name="group"
            value={this.state.group}
            onChange={(event) => this.OnChangeInputs(event)}
          >
            <MenuItem selected value="all">Все</MenuItem>
            {this.props.userList.userGroupData.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
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
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <TextField id="search" label="Поиск" variant="outlined" name="search" autoComplete="off" onChange={(event) => this.OnChangeInputs(event)} value={this.state.search} />
        {this.roleSelect()}
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
});

export default withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListFilterComponent));
