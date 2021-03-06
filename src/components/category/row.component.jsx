import React, { useContext, useRef, useState } from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';
import CategoryEditorDialog from '../editorDialog/categoryEditorDialog';

import AccessContext from '../../contexts/access.context';

import { deleteCategory } from '../../redux/category/category.action';
import { deleting } from '../../utils/fetching';

const Row = (props) => {
    const { url, token } = useContext(AccessContext);

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

        // deleting(`${url}/categories/${props.category.id}`,token)
        fetch(`${url}/categories/${props.category.id}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            props.deleteCategory(props.category);
            // handleAlert(true, "Deleted Successfully!");
        })
        .catch(error => console.log('error', error));
    }
    
    return (
        <TableRow  hover ref={outerRef}>
            <TableCell>{props.category.name}</TableCell>
            <TableCell>{ (props.category.hasOwnProperty("id")) ? props.category.id : "" }</TableCell>
            <TableCell align='right'><IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton></TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <CategoryEditorDialog data={props.category} open={dialog} handleClose={() => setDialog(false)} />
        </TableRow>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteCategory: category => dispatch(deleteCategory(category))
});

export default connect(null,mapDispatchToProps)(Row);