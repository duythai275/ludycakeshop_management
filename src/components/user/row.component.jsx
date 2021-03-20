import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const Row = props => {
    return (
        <TableRow hover>
            <TableCell>{props.user.email}</TableCell>
            <TableCell>{props.user.name}</TableCell>
            <TableCell>
                <Switch
                    checked={(props.user.active === 1) ? true : false}
                    onChange={props.handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton size="small">
                    <DeleteIcon onClick={props.handleDelete} />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default Row;