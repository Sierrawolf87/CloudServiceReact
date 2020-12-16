import React from 'react';
import { Mail, Menu } from '@material-ui/icons';
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@material-ui/core";
import './TopAppBar.css';
import { withRouter } from 'react-router-dom';

class TopAppBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            drawerOpen: false,
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
                <Button color="inherit" onClick={() => this.props.history.push("/auth")}>Войти</Button>
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

export default withRouter(TopAppBar);