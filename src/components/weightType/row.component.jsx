import React, { useContext, useRef, useState } from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';
import WeightTypeEditorDialog from '../editorDialog/weightTypeEditorDialog';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

import { deleteWeightType } from '../../redux/weightType/weightType.action';
import { deleting } from '../../utils/fetching';

const Row = (props) => {
    const { url, token } = useContext(AccessContext);
    const { handleAlert } = useContext(AlertContext);

    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);

    const handleEdit = () => {
        // console.log(`Edit Clicked - ${product.name}`);
        setAnchorEl(null);
        setDialog(true);
    }

    const handleDelete = () => {
        setAnchorEl(null);

        // deleting(`${url}/weighttype/${props.weightType.id}`, token)
        fetch(`${url}/weighttype/${props.weightType.id}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => {
            // console.log(result);
            props.deleteWeightType(props.weightType);
            handleAlert(true, "Deleted Successfully!");
        })
        .catch(error => console.log('error', error));
    }
    
    return (
        <TableRow  hover ref={outerRef}>
            <TableCell>{props.weightType.name}</TableCell>
            <TableCell>{props.weightType.id}</TableCell>
            <TableCell align='right'><IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton></TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <WeightTypeEditorDialog weightType={props.weightType} open={dialog} handleClose={() => setDialog(false)} />
        </TableRow>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteWeightType: weightType => dispatch(deleteWeightType(weightType))
});

export default connect(null,mapDispatchToProps)(Row);