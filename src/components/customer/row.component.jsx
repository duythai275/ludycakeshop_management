// import React Redux
import React from 'react';

// import Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

/**
 * Row component of an user 
 * @param {*} props of component
 * @returns component
 */
 const Row = props => {
    return (
        <TableRow hover>
            <TableCell>{props.customer.customerID}</TableCell>
            <TableCell>{props.customer.email}</TableCell>
            <TableCell>{props.customer.code}</TableCell>
            <TableCell align="right">
                <IconButton size="small">
                    <DeleteIcon onClick={props.handleDelete} />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default Row;