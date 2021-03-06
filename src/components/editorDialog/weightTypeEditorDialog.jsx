import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';

import { addWeightType, editWeightType } from '../../redux/weightType/weightType.action';
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

const WeightTypeEditorDialog = (props) => {
    const { url, token } = useContext(AccessContext);
    const [weightType, setWeightType] = useState(props.weightType);

    const handleAddWeightType = () => {
        // adding(`${url}/weighttype`, token, weightType);
        fetch(`${url}/weighttype`, {
            'method': 'POST',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(weightType)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            props.addWeightType(weightType);
            // handleAlert(true, "Edited Successfully!");
        })
        .catch(error => console.log('error', error));
        props.handleClose();
    }

    const handleEditWeightType = () => {
        // updating(`${url}/weighttype/${props.weightType.id}`, token, weightType)
        fetch(`${url}/weighttype/${props.weightType.id}`, {
            'method': 'PUT',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(weightType)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            props.editWeightType(weightType);
            // handleAlert(true, "Edited Successfully!");
        })
        .catch(error => console.log('error', error));
        props.handleClose();
    }

    const updateValue = ( value ) => {
        weightType["name"] = value;
        setWeightType({...weightType});
    }

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
                    onChange={event => updateValue(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {
                    (props.weightType.name === "") ? 
                        <Button variant="contained" color="primary" onClick={handleAddWeightType}>
                            Add
                        </Button>
                    :
                    <Button variant="contained" color="primary" onClick={handleEditWeightType}>
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
    addWeightType: weightType => dispatch(addWeightType(weightType)),
    editWeightType: weightType => dispatch(editWeightType(weightType))
});

export default connect(null,mapDispatchToProps)(WeightTypeEditorDialog);