import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryEditorDialog = (props) => {
    const [category, setCategory] = useState(props.category);

    return (
        <Dialog 
            fullWidth={true}
            maxWidth={'xs'}
            open={props.open} 
            onClose={props.handleClose} 
            TransitionComponent={Transition}
        >
            <DialogTitle>{(props.category.name === "") ? "Add Category" : "Update Category" }</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category Name"
                    fullWidth
                    value={category.name}
                    onChange={event => setCategory(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {
                    (props.category.name === "") ? 
                        <Button variant="contained" color="primary" onClick={props.handleClose} color="primary">
                            Add
                        </Button>
                    :
                    <Button variant="contained" color="primary" onClick={props.handleClose} color="primary">
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

export default CategoryEditorDialog;