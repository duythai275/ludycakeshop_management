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
                    checked={props.user.name}
                    // onChange={handleChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton size="small">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default Row;