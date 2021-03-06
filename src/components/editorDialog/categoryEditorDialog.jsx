import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';

import { addCategory, editCategory } from '../../redux/category/category.action';
import { adding, deleting, updating } from '../../utils/fetching';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import AccessContext from '../../contexts/access.context';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryEditorDialog = (props) => {
    const { url, token } = useContext(AccessContext);
    const [category, setCategory] = useState(props.data);

    const handleAddCategory = () => {
        // adding(`${url}/categories`, token, category)
        fetch(`${url}/categories`, {
            'method': 'POST',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(category)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            props.addCategory(category);
            // handleAlert(true, "Edited Successfully!");
        })
        .catch(error => console.log('error', error));
        props.handleClose();
    }

    const handleUpdateCategory = () => {
        // updating(`${url}/categories/${props.data.id}`, token, category)
        fetch(`${url}/categories/${props.data.id}`, {
            'method': 'PUT',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(category)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            props.editCategory(category);
            // handleAlert(true, "Edited Successfully!");
        })
        .catch(error => console.log('error', error));
        props.handleClose();
    }

    const updateValue = ( value ) => {
        category["name"] = value;
        setCategory({...category});
    }

    return (
        <Dialog 
            fullWidth={true}
            maxWidth={'xs'}
            open={props.open} 
            onClose={props.handleClose} 
            TransitionComponent={Transition}
        >
            <DialogTitle>{(props.data.name === "") ? "Add Category" : "Update Category" }</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category Name"
                    fullWidth
                    value={category.name}
                    onChange={event => updateValue(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {
                    (props.data.name === "") ? 
                        <Button variant="contained" color="primary" onClick={handleAddCategory}>
                            Add
                        </Button>
                    :
                    <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
                        Update
                    </Button>
                }
                <Button variant="contained" onClick={props.handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapDispatchToProps = dispatch => ({
    editCategory: category => dispatch(editCategory(category)),
    addCategory: category => dispatch(addCategory(category))
});

export default connect(null,mapDispatchToProps)(CategoryEditorDialog);