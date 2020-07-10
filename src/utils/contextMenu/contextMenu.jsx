import React, { useEffect, useCallback, useState } from 'react';

import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import StyledMenuItem from '../styleMenuItem/styledMenuItem';

const useContextMenu = outerRef => {
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const [menu, showMenu] = useState(false);

    const handleContextMenu = useCallback(
        event => {
            event.preventDefault();
            if ( outerRef && outerRef.current.contains(event.target)) {
                setXPos(event.pageX);
                setYPos(event.pageY);
                showMenu(true);
            } else {
                showMenu(false);
            }
        },
        [showMenu, outerRef, setXPos, setYPos]
    );

    const hanleClick = useCallback( () => {
        showMenu(false);
    }, [showMenu]);

    useEffect( () => {
        document.addEventListener("click", hanleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.addEventListener("click", hanleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        }
    });

    return { xPos, yPos, menu };
}

const ContextMenu = ({ outerRef, onEditClick, onDeleteClick }) => {
    const { xPos, yPos, menu } = useContextMenu(outerRef);

    if (menu) {
        return <Menu 
            // anchorEl={anchorEl}
            // keepMounted
            open={menu}
            anchorReference="anchorPosition"
            // anchorPosition={{ top: (anchorEl === null) ? 0 : anchorEl.clientX, left: (anchorEl === null) ? 0 : anchorEl.clientY }}
            anchorPosition={{ top: yPos, left: xPos }}
            // anchorOrigin={{
            //     vertical: 'center',
            //     horizontal: 'center',
            // }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            // getContentAnchorEl={null}
        >
            <StyledMenuItem onClick={onEditClick}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
            </StyledMenuItem>
            <StyledMenuItem onClick={onDeleteClick}>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
            </StyledMenuItem>
        </Menu>
    }

    return <></>;
}

export default ContextMenu;