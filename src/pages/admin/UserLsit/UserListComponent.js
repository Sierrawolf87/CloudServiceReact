import { Box, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { withSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { CSCard, CSCardSkeleton } from '../../../modules/components/CSCard/CSCard';
import { getUserById, getUserList } from './UserListSlice';

const styles = () => ({
  userList: {
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserList(this.props.userList.nextPage);
  }

  windowScroll(e) {
    if ((e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight)
        && this.props.userList.nextPage !== null) {
      this.props.getUserList(this.props.userList.nextPage);
    }
  }

  render() {
    const { classes } = this.props;
    const buttons = [
      {
        actionOnClick: (id) => {
          this.props.getUserById(id);
          this.props.onOpenDialog('userEditOpen', id);
        },
        icon: <Edit />,
      },
      {
        actionOnClick: () => { },
        icon: <Delete />,
      },
    ];
    if (this.props.userList.loading === false) {
      return (
        <Box className={classes.userList} onScroll={(e) => this.windowScroll(e)}>
          {this.props.userList.userListData.map((item) => (
            <CSCard
              key={item.id}
              id={item.id}
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
      <Box className={classes.userList}>
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
        <CSCardSkeleton />
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.userList,
});

const mapDispatchToProps = () => (dispatch) => ({
  getUserList: (page, size) => dispatch(getUserList(null, null, null, page, size)),
  getUserById: (id) => dispatch(getUserById(id)),
});

export default withSnackbar(withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListComponent)));
