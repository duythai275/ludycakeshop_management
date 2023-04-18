// import React modules
import React, { useState, useRef, useContext } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

// import menu and editor dialog components
import OrderEditorDialog from '../editorDialog/orderEditorDialog';
import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import Redux action
import { deleteOrder } from '../../redux/order/order.action';

// import functions for requesting to server 
import { deleting } from '../../utils/fetching';

/**
 * Row component of a order 
 * @param {*} props of component
 * @returns component
 */
 const Row = props => {

    // authentication
    const { url, token } = useContext(AccessContext);
    
    // use context to set alert notification
    const { handleAlert } = useContext(AlertContext);

    // Use for right-clicked menu
    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);

    // Open dialog
    const handleEdit = () => {
        setDialog(true);
    }

    // Delete order
    const handleDelete = () => {
        deleting(`${url}/orders/${props.order.orderID}`)
        .then(res => {
            props.deleteOrder(props.order);
            handleAlert(true, "Deleted Successfully!");
        });
    }

    return (
        <TableRow hover ref={outerRef}>
            <TableCell>{props.order.orderDate}</TableCell>
            <TableCell>{props.order.customerName}</TableCell>
            <TableCell>{props.order.customerEmail}</TableCell>
            <TableCell>{props.order.customerContactNumber}</TableCell>
            <TableCell>
                { 
                    (props.order.orderStatus === "pending") ? <Chip label={"Pending"} disabled /> : 
                        (props.order.orderStatus === "confirmed") ? <Chip label={"Confirmed"} color="primary" /> :
                            (props.order.orderStatus === "ready") ? <Chip label={"Ready"} /> : <Chip label={"Paid"} color="secondary" />
                }
            </TableCell>
            <TableCell align='center'><IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton></TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <OrderEditorDialog open={dialog} handleClose={() => setDialog(false)} order={props.order} />
        </TableRow>
    )
}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
 const mapDispatchToProps = dispatch => ({
    deleteOrder: order => dispatch(deleteOrder(order))
});

export default connect(null ,mapDispatchToProps)(Row);