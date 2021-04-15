// import React modules
import React from 'react';

// import Styled MenuItem
import StyledMenuItem from '../styleMenuItem/styledMenuItem';

// import Material UI
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/**
 * Sub Menu
 * @param {*} props of the component 
 * @returns component
 */
const StyledMenu = ({ anchorEl, handleEdit, handleDelete, handleClose }) => {
    return (
        <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        getContentAnchorEl={null}
    >
        <StyledMenuItem onClick={handleEdit}>
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleDelete}>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
        </StyledMenuItem>
    </Menu>
    )
}

export default StyledMenu;