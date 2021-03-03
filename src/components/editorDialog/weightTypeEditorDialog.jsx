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

const WeightTypeEditorDialog = (props) => {
    const [weightType, setWeightType] = useState(props.weightType);

    return (
        <Dialog 
            fullWidth={true}
            maxWidth={'xs'}
            open={props.open} 
            onClose={props.handleClose} 
            TransitionComponent={Transition}
        >
            <DialogTitle>{(props.weightType.name === "") ? "Add Weight Type" : "Update Weight Type" }</DialogTitle>
            <DialogContent>
                <TextField
                    label="Weight Type"
                    fullWidth
                    value={weightType.name}
                    onChange={event => setWeightType(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {
                    (props.weightType.name === "") ? 
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

export default WeightTypeEditorDialog;