// import React modules
import React, { useState, useContext } from 'react';

// import Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import React contexts
import AccessContext from '../../contexts/access.context';

import { adding } from '../../utils/fetching';

/**
 * Animation for Component
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Dialog for registering new user
 * @param {*} props of component
 * @returns component
 */
const CustomerDialog = props => {

    const sample = (d, fn = Math.random) => {
        if (d.length === 0) {
          return;
        }
        return d[Math.round(fn() * (d.length - 1))];
    };
      
    const generateCode = (limit = 10, fn = Math.random) => {
        const allowedLetters = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"].join("");
        const allowedChars = ["0123456789", allowedLetters].join("");
        const arr = [sample(allowedLetters, fn)]; // sample 1 to make sure it starts with a letter
        for (let i = 0; i < limit - 1; i++) {
          arr.push(sample(allowedChars, fn));
        }
        return arr.join("");
    };

    // inputs
    const [customer, setCustomer] = useState({
        email: "",
        code: generateCode()
    });

    // authentication
    const { url, token } = useContext(AccessContext);

    // handle close dialog
    const closeDialog = () => {
        setCustomer({
            email: "",
            code: generateCode()
        });
        props.handleClose();
    }

    // handle add new user
    const addUser = () => {
        props.handleBackdrop();
        adding(`${url}/customers`, customer).then( res => {
            props.updateCustomers();
        })
        closeDialog();
    }

    return (
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
    >
        <DialogTitle><Typography component="h4" variant="h5">Add a new user</Typography></DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        label="Email"
                        fullWidth
                        value={customer.email}
                        onChange={e => setCustomer({
                            ...customer,
                            email: e.target.value
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Code"
                        fullWidth
                        value={customer.code}
                        disabled
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={() => addUser()}>
                Add
            </Button>
            <Button variant="contained" onClick={() => closeDialog()}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default CustomerDialog;