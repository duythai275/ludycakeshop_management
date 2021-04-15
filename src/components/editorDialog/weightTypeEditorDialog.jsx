// import React modules
import React, { useState, useContext } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Redux action
import { fetchAllWeightTypes, editWeightType } from '../../redux/weightType/weightType.action';

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
 * Editor dialog for Weight type
 * @param {*} props of component
 * @returns component
 */
const WeightTypeEditorDialog = (props) => {
    // authentication
    const { url, token } = useContext(AccessContext);

    // alert for any action
    const { handleAlert } = useContext(AlertContext);

    // inputs
    const [weightType, setWeightType] = useState({
        "name": props.weightType.name
    });

    // handle adding weight type
    const handleAddWeightType = () => {
        adding(`${url}/weighttype`, token, weightType)
        .then(result => {
            props.addWeightType(result);
            handleAlert(true, "Added Successfully!");
        });
        props.handleClose();
        setWeightType({
            "name": ""
        });
    }

    // handle updating weight type
    const handleEditWeightType = () => {
        updating(`${url}/weighttype/${props.weightType.id}`, token, weightType)
        .then(result => {
            props.editWeightType({
                "id": props.weightType.id,
                "name": weightType.name
            });
            handleAlert(true, "Edited Successfully!");
        });
        props.handleClose();
    }

    // update inputs
    const updateValue = ( value ) => {
        weightType["name"] = value;
        setWeightType({...weightType});
    }

    // handle close dialog
    const closeDialog = () => {
        props.handleClose();
        setWeightType({
            "name": props.weightType.name
        });
    }

    return (
        <Dialog 
            fullWidth={true}
            maxWidth={'xs'}
            open={props.open} 
            onClose={() => closeDialog()} 
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
    addWeightType: weightTypes => dispatch(fetchAllWeightTypes(weightTypes)),
    editWeightType: weightType => dispatch(editWeightType(weightType))
});

export default connect(null,mapDispatchToProps)(WeightTypeEditorDialog);