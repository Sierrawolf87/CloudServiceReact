import { Delete, Edit } from '@material-ui/icons';
import React from 'react'
import CSCard from '../../../modules/components/CSCard/CSCard';


class UserList extends React.Component {

    render() {
        const buttons = [
            {
                actionOnClick: () => { },
                icon: <Edit />,
            },
            {
                actionOnClick: () => { },
                icon: <Delete />,
            }
        ]
        return (
            <CSCard title="asd" buttons={buttons} />
        )
    }
}

export default UserList;