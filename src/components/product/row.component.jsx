import React, { useContext, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import AccessContext from '../../contexts/access.context';

import ContextMenu from '../../utils/contextMenu/contextMenu';
import StyledMenu from '../../utils/menu/menu';
import EditorDialog from '../../utils/editorDialog/editorDialog';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


import { deleteProduct } from '../../redux/product/product.action';

import { useStyles } from './product.styles';

const Row = (props) => {
    const classes = useStyles();

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
        // console.log(`Delete Clicked - ${product.name}`);
        setAnchorEl(null);

        fetch(`${url}/admin/product?id=${props.product.id}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            props.deleteProduct(props.product);
        })
        .catch(error => console.log('error', error));
        
    }

    return (
    <TableRow hover ref={outerRef}>
        <TableCell>{props.product.name}</TableCell>
        <TableCell>{props.product.brand}</TableCell>
        <TableCell className={classes.chip}>
        {
            props.product.category.map( category => 
                <Chip key={category._id} size="small" label={category.name} />
            )
            // product.category
        }
        </TableCell>
        <TableCell>{props.product.price}</TableCell>
        {/* <TableCell><Avatar src={`${url}/products/${product.image}`} className={classes.smallAvatar} /></TableCell> */}
        <TableCell align='center'>
            <IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton>
        </TableCell>
        <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
        <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
        <EditorDialog open={dialog} handleClose={() => setDialog(false)} data={props.product}/>
    </TableRow>
)}

const mapDispatchToProps = dispatch => ({
    deleteProduct: product => dispatch(deleteProduct(product))
});

export default connect(null, mapDispatchToProps)(Row);