import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { selectCategories } from '../../redux/category/category.selector';

// import { useStyles } from './category.styles';
  
const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
}))(MenuItem);

const Categories = ({categories}) => {

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
        console.log(event);
        setAnchorEl(event.currentTarget);
        // setAnchorEl(event);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
    <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Categories
        </Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Code</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                categories.map( category => 
                    <TableRow key={category._id} onClick={handleClick}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.code}</TableCell>
                    </TableRow>
                )
            }
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    // anchorReference="anchorPosition"
                    // anchorPosition={{ top: (anchorEl === null) ? 0 : anchorEl.clientX, left: (anchorEl === null) ? 0 : anchorEl.clientY }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    getContentAnchorEl={null}
                >
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </StyledMenuItem>
                </Menu>
            </TableBody>
        </Table>
    </React.Fragment>
)}

// const mapStateToProps = state => ({
//     categories: state.category.categories
// })

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
})

export default connect(mapStateToProps)(Categories);