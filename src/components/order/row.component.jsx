import React, { useState, useRef, useContext } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

import OrderEditorDialog from '../editorDialog/orderEditorDialog';

import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

import { deleting } from '../../utils/fetching';

const Row = props => {

    const { url, token } = useContext(AccessContext);
    const { handleAlert } = useContext(AlertContext);

    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);

    const handleEdit = () => {
        setDialog(true);
    }

    const handleDelete = () => {
        deleting(`${url}/admin/order?id=${props.order.id}`,token)
        .then(res => {
            props.updateOrders();
            handleAlert(true, "Deleted Successfully!");
        });
    }

    return (
        <TableRow hover ref={outerRef}>
            <TableCell>{props.order.orderDate}</TableCell>
            <TableCell>{props.order.orderName}</TableCell>
            <TableCell>{props.order.email}</TableCell>
            <TableCell>{props.order.phone}</TableCell>
            <TableCell>
                { 
                    (props.order.status === "pending") ? <Chip label={"Pending"} disabled /> : 
                        (props.order.status === "confirmed") ? <Chip label={"Confirmed"} color="primary" /> :
                            (props.order.status === "ready") ? <Chip label={"Ready"} /> : <Chip label={"Paid"} color="secondary" />
                }
            </TableCell>
            <TableCell align='center'><IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton></TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <OrderEditorDialog open={dialog} handleClose={() => setDialog(false)} order={props.order} updateOrders={props.updateOrders}/>
        </TableRow>
    )
}

export default Row;