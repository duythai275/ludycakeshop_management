// import React modules
import React, { useState, useContext } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Redux action
import { fetchAllCategories, editCategory } from '../../redux/category/category.action';

// import functions for requesting to server 
import { adding, updating } from '../../utils/fetching';

// import Material UI
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

/**
 * Animation for Component
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Editor dialog for Category
 * @param {*} props of component
 * @returns component
 */
const CategoryEditorDialog = (props) => {
    // authentication
    const { url, token } = useContext(AccessContext);
    
    // alert for any action
    const { handleAlert } = useContext(AlertContext);

    // inputs
    const [category, setCategory] = useState({
        "name": props.data.name
    });

    // handle adding category
    const handleAddCategory = () => {
        adding(`${url}/categories`, token, category)
        .then(result => {
            props.addCategory(result);
            handleAlert(true, "Added Successfully!");
        });
        props.handleClose();
        setCategory({
            "name": ""
        });
    }

    // handle updating category
    const handleUpdateCategory = () => {
        updating(`${url}/categories/${props.data.id}`, token, category)
        .then(result => {
            props.editCategory({
                "id": props.data.id,
                "name": category.name
            });
            handleAlert(true, "Edited Successfully!");
        });
        props.handleClose();
    }

    // update inputs
    const updateValue = ( value ) => {
        category["name"] = value;
        setCategory({...category});
    }

    // handle close dialog
    const closeDialog = () => {
        props.handleClose();
        setCategory({
            "name": props.data.name
        })
    }

    return (
        <Dialog 
            fullWidth={true}
            maxWidth={'xs'}
            open={props.open} 
            onClose={() => closeDialog()} 
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
                <Button variant="contained" onClick={() => closeDialog()}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    editCategory: category => dispatch(editCategory(category)),
    addCategory: categories => dispatch(fetchAllCategories(categories))
});

export default connect(null,mapDispatchToProps)(CategoryEditorDialog);