import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content'
    },
        formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120
    },
    formControlLabel: {
        marginTop: theme.spacing(1)
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryEditorDialog = (props) => {
    const classes = useStyles();
    return (
        <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <DialogTitle>Add / Update Category</DialogTitle>
            <DialogContent>
                <DialogContentText>Category Name</DialogContentText>
            </DialogContent>
            <form className={classes.form} noValidate>
                <FormControl className={classes.formControl}>
                    <TextField
                        label="Category Name"
                        fullWidth
                    />
                </FormControl>
            </form>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CategoryEditorDialog;