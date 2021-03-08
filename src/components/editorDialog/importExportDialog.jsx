import React, { useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import CancelIcon from '@material-ui/icons/Cancel';

import AccessContext from '../../contexts/access.context';

import exporting from '../../utils/exporting';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImportExportDialog = props => {
    const { url, token } = useContext(AccessContext);

    const handleUpload = () => {}

    return (
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
    >
        <DialogTitle>Import and Export Products</DialogTitle>
        <DialogContent>
            For importing products, your sheet should use the following column names:
            <ul>
                <li>name</li>
                <li>description</li>
                <li>brand</li>
                <li>price</li>
                <li>active</li>
                <li>image</li>
                <li>category</li>
                <li>quantity</li>
                <li>weightValue</li>
                <li>weightType</li>
            </ul>
            <strong><u>Note:</u></strong><br></br>
            - name is mandatory field. Your sheet should have this column, the other columns are optional. <br></br>
            - category and weightType are using their ids, you can refer the <strong>Category and Weight Type management page</strong> to know their ids.
        </DialogContent>
        <DialogActions>
            <input 
                style={{ display: "none" }}
                accept=".xls,.xlsx,.csv"
                id="importing-button"
                type="file"
                onChange={handleUpload}
            />
            <label htmlFor="importing-button">
                <Button variant="contained" color="primary" startIcon={<PublishIcon />} component="span">
                    Import
                </Button>
            </label>

            {/* <input 
                style={{ display: "none" }}
                accept=".xls,.xlsx,.csv"
                id="exporting-button"
                type="file"
                onChange={handleDownload}
            />
            <label htmlFor="exporting-button">
                <Button variant="contained" color="primary" startIcon={<GetAppIcon />} component="span">
                    Export
                </Button>
            </label> */}

            <Button variant="contained" color="primary" startIcon={<GetAppIcon />} onClick={e => exporting(url,token)}>
                Export
            </Button>

            <Button variant="contained" startIcon={<CancelIcon />} onClick={props.handleClose}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
)}

export default ImportExportDialog;