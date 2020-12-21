/* eslint-disable no-unused-vars */
import { Box, Snackbar } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Alert, Skeleton } from '@material-ui/lab';
import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CSCard, CSCardSkeleton } from '../../../modules/components/CSCard/CSCard';
import { checkUser } from '../../Auth/AuthSlice';

import './UserList.css';

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        open: false,
      },
      error: '',
      list: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    checkUser();
    Axios({
      url: 'https://localhost:5001/api/users',
      method: 'GET',
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
      },
    })
      .then((res) => {
        this.setState({
          list: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        const { status } = error.request;
        let currentError;
        if (status === 0) currentError = 'Ошибка подключения к серверу';
        if (status === 401) this.props.history.push(`/auth?redirectUrl=${window.location.href}`);
        if (status >= 400 && status < 500) currentError = error.request.response;
        this.setState({
          error: currentError,
          alert: {
            open: true,
          },
          loading: true,
        });
      });
  }

  renderAlertError() {
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      this.setState({
        alert: {
          open: false,
        },
      });
    };

    return (
      <Snackbar open={this.state.alert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {this.state.error}
        </Alert>
      </Snackbar>
    );
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
    if (this.state.loading === false) {
      return (
        <Box className="userRoot">
          {this.state.list.map((item) => (
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
        {this.renderAlertError()}
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  userlist: state.userlist,
});

const mapDispatchToProps = () => (dispatch) => ({
  checkUser: () => dispatch(checkUser()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListComponent));
