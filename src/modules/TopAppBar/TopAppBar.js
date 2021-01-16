import React from 'react';
import {
  AccountCircle, Mail, Menu, People,
} from '@material-ui/icons';
import {
  AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon,
  ListItemText, MenuItem, Toolbar, Typography, Menu as UserMenu, Fade, withStyles,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkUser, signOut } from '../../pages/Auth/AuthSlice';
import { RoleRoot, RoleStudent, RoleTeacher } from '../../pages/Auth/RoleList';

const style = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.appBar,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  list: {
    width: '200px',
  },
});

class TopAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      accountMenuOpen: false,
      anchorEl: null,
      redirect: false,
    };
  }

  componentDidMount() {
    if (
      !(window.location.pathname === '/auth'
      || window.location.pathname === '/auth/ForgotPassword'
      || window.location.pathname === '/auth/ResetPassword')
    ) {
      this.props.checkUser();
    }
  }

  buttonOrMenu() {
    if (
      window.location.pathname === '/auth'
      || window.location.pathname === '/auth/ForgotPassword'
      || window.location.pathname === '/auth/ResetPassword'
    ) {
      return (<div />);
    }

    const handleMenu = (event) => {
      this.setState({
        accountMenuOpen: true,
        anchorEl: event.currentTarget,
      });
    };

    const handleClose = () => {
      this.setState({
        accountMenuOpen: false,
        anchorEl: null,
      });
    };

    if (this.props.auth.userData.isAuthorized === true) {
      return (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <UserMenu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.accountMenuOpen}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Профиль</MenuItem>
            <Divider />
            <MenuItem onClick={() => this.props.signOut()}>Выход</MenuItem>
          </UserMenu>
        </div>
      );
    }
    return (
      <Button color="inherit" onClick={() => window.location.assign(`/auth?redirectUrl=${window.location.href}`)}>Войти</Button>
    );
  }

  redirect() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/auth?redirectUrl=${window.location.href}`} />
      );
    }
    return (<div />);
  }

  list() {
    const { classes } = this.props;
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ drawerOpen: open });
    };

    if (this.props.auth.userData.isAuthorized === true) {
      if (this.props.auth.userData.role === RoleRoot) {
        return (
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={() => window.location.assign('/admin/userlist')}>
                <ListItemIcon><People /></ListItemIcon>
                <ListItemText primary="Все пользователи" />
              </ListItem>
            </List>
            <Divider />
          </div>
        );
      }
      if (this.props.auth.userData.role === RoleTeacher) {
        return (
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemIcon><Mail /></ListItemIcon>
                <ListItemText primary="Тест для teacher" />
              </ListItem>
            </List>
            <Divider />
          </div>
        );
      }
      if (this.props.auth.userData.role === RoleStudent) {
        return (
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemIcon><Mail /></ListItemIcon>
                <ListItemText primary="Тест для student" />
              </ListItem>
            </List>
            <Divider />
          </div>
        );
      }
    }
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button>
            <ListItemIcon><Mail /></ListItemIcon>
            <ListItemText primary="Тест" />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ drawerOpen: open });
    };
    return (
      <div className={classes.root}>
        {this.redirect()}
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title} onClick={() => window.location.assign('/')}>
              Cloud Service
            </Typography>
            {this.buttonOrMenu()}
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.drawerOpen} onClose={toggleDrawer(false)}>
          {this.list()}
        </Drawer>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = () => (dispatch) => ({
  checkUser: () => dispatch(checkUser()),
  signOut: () => dispatch(signOut()),
});

export default withStyles(style)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopAppBar));
