import React, { useState, useRef, useContext } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

const Row = props => {
    const { url, token } = useContext(AccessContext);
    const { handleAlert } = useContext(AlertContext);

    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleEdit = () => {
        // setDialog(true);
    }

    const handleDelete = () => {
        // deleting(`${url}/admin/order?id=${props.order.id}`,token)
        // .then(res => {
        //     props.updateOrders();
        //     handleAlert(true, "Deleted Successfully!");
        //     props.deleteOrder(props.order);
        // });
    }

    return (
        <TableRow hover ref={outerRef}>
            <TableCell>{props.event.title}</TableCell>
            <TableCell>{props.event.startDate}</TableCell>
            <TableCell>{props.event.endDate}</TableCell>
            <TableCell align="center">
                <IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}>
                    <MoreVertIcon size="small" />
                </IconButton>
            </TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
        </TableRow>
    )
}

export default Row;