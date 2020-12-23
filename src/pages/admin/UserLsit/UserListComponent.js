/* eslint-disable no-unused-vars */
import { Box, Snackbar } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Alert, Skeleton } from '@material-ui/lab';
import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CSAlert from '../../../modules/Alerts/CSAlert';
import { CSCard, CSCardSkeleton } from '../../../modules/components/CSCard/CSCard';
import { checkUser } from '../../Auth/AuthSlice';

import './UserList.css';
import { getUserList } from './UserListSlice';

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
  }

  render() {
    const buttons = [
      {
        actionOnClick: () => { },
        icon: <Edit />,
      },
      {
        actionOnClick: () => { },
        icon: <Delete />,
      },
    ];
    debugger;
    if (this.props.userList.loading === false) {
      return (
        <Box className="userRoot">
          {this.props.userList.userListData.map((item) => (
            <CSCard
              key={item.id}
              header={item.userName}
              title={item.initials}
              signature={item.role.name}
              body={
              `ID: ${item.id} \n`
              + `Фамилия: ${item.surname} \n`
              + `Имя: ${item.name} \n`
              + `Отчество: ${item.patronymic} \n`
              + `Студенческий: ${item.reportCard} \n`
              + `Email: ${item.email} \n`
            }
              buttons={buttons}
            />
          ))}
        </Box>
      );
    }
    return (
      <Box className="userRoot">
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSAlert text={this.props.userList.error} variant="error" />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
});

const mapDispatchToProps = () => (dispatch) => ({
  getUserList: () => dispatch(getUserList()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListComponent));
