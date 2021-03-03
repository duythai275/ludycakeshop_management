import React, { useContext, useRef, useState } from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';
import CategoryEditorDialog from '../editorDialog/categoryEditorDialog';

import { deleteCategory } from '../../redux/category/category.action';

const Row = (props) => {
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
    }
    
    return (
        <TableRow  hover ref={outerRef}>
            <TableCell>{props.category.name}</TableCell>
            <TableCell>{props.category.id}</TableCell>
            <TableCell align='right'><IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton></TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <CategoryEditorDialog category={props.category} open={dialog} handleClose={() => setDialog(false)} />
        </TableRow>
    )
}

export default Row;