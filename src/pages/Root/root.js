import { Box } from '@material-ui/core';
import React from 'react'
import TopAppBar from '../../modules/TopAppBar/TopAppBar';
import UserList from '../admin/UserLsit/UserList';

class Root extends React.Component{
    
    render(){
        return(
            <Box>
                <TopAppBar />
                <UserList />
            </Box>
        )
    }
}

export default Root;