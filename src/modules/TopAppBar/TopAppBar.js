import React from 'react';
import { AccountCircle, Mail, Menu } from '@material-ui/icons';
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography, Menu as UserMenu, Fade } from "@material-ui/core";
import './TopAppBar.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkUser, signOut } from '../../pages/Auth/AuthSlice';

class TopAppBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            drawerOpen: false,
            accountMenuOpen: null,
            anchorEl: null
        }
        this.props.checkUser();
    }

    buuronOrMenu(){
        const handleMenu = (event) => {
            this.setState({
                accountMenuOpen: true,
                anchorEl: event.currentTarget
            })
        };
        
        const handleClose = () => {
            this.setState({
                accountMenuOpen: false,
                anchorEl: null
            })
        };
          
        if (this.props.auth.userData.isAuthorized === true) {
            return(
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
            )
        } else {
            return (
                <Button color="inherit" onClick={() => this.props.history.push("/auth")}>Войти</Button>
            )
        }
    }

    render(){
        const toggleDrawer = (open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
              return;
            }
            this.setState({ ...this.state, drawerOpen: open });
        }

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
                        <ListItemText primary="Тест"/>
                    </ListItem>
                </List>
                <Divider />
            </div>
            );

        return(
            <div className="root">
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                  <Menu />
                </IconButton>
                <Typography variant="h6" className="title">
                  Cloud Service
                </Typography>
                {this.buuronOrMenu()}
              </Toolbar>
            </AppBar>
                <React.Fragment>
                    <Drawer open={this.state.drawerOpen} onClose={toggleDrawer(false)}>
                        {list()}
                    </Drawer>
                </React.Fragment>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = () => dispatch => {
    return {
        checkUser: () => dispatch(checkUser()),
        signOut: () => dispatch(signOut())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(TopAppBar));
