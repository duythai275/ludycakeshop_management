// import React modules
import React, { useContext, useRef, useState } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

// import menu and editor dialog components
import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';
import WeightTypeEditorDialog from '../editorDialog/weightTypeEditorDialog';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import Redux action
import { deleteWeightType } from '../../redux/weightType/weightType.action';

// import functions for requesting to server 
import { deleting } from '../../utils/fetching';

/**
 * Row component of a weight type 
 * @param {*} props of component
 * @returns component
 */
const Row = (props) => {
    const { url, token } = useContext(AccessContext);
    const { handleAlert } = useContext(AlertContext);

    // Use for right-clicked menu
    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);

    // Open dialog
    const handleEdit = () => {
        setAnchorEl(null);
        setDialog(true);
    }

    // Delete weight type
    const handleDelete = () => {
        setAnchorEl(null);

        deleting(`${url}/weighttype/${props.weightType.id}`, token)
        .then(result => {
            props.deleteWeightType(props.weightType);
            handleAlert(true, "Deleted Successfully!");
        });
    }
    
    return (
        <TableRow  hover ref={outerRef}>
            <TableCell>{props.weightType.name}</TableCell>
            <TableCell>{props.weightType.id}</TableCell>
            <TableCell align='right'><IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton></TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <WeightTypeEditorDialog weightType={props.weightType} open={dialog} handleClose={() => setDialog(false)} />
        </TableRow>
    )
}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    deleteWeightType: weightType => dispatch(deleteWeightType(weightType))
});

export default connect(null,mapDispatchToProps)(Row);