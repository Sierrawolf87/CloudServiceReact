import React from 'react';
import { AccountCircle, Mail, Menu } from '@material-ui/icons';
import {
  AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon,
  ListItemText, MenuItem, Toolbar, Typography, Menu as UserMenu, Fade,
} from '@material-ui/core';
import './TopAppBar.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkUser, signOut } from '../../pages/Auth/AuthSlice';

class TopAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      accountMenuOpen: false,
      anchorEl: null,
      redirect: false,
    };
    this.props.checkUser();
  }

  buttonOrMenu() {
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

  render() {
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ drawerOpen: open });
    };

    const list = () => (
      <div
        className="list"
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

    return (
      <div className="AppBarRoot">
        {this.redirect()}
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className="AppBarMenuButton" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" className="AppBarTitle" onClick={() => window.location.assign('/')}>
              Cloud Service
            </Typography>
            {this.buttonOrMenu()}
          </Toolbar>
        </AppBar>
        <>
          <Drawer open={this.state.drawerOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopAppBar);
