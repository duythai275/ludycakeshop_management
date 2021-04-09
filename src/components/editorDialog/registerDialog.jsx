import React, { useState, useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccessContext from '../../contexts/access.context';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterDialog = props => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: ""
    });

    const [err, setErr] = useState({
        email: false,
        name: false
    });

    const { url, token } = useContext(AccessContext);

    const checkUser = ( key, value ) => {
        user[key] = value;
        setUser({...user});

        let flag = false;
        props.users.forEach( u => {
            if ( u[key] === value ) flag = true;
        });

        if (err[key] !== flag) {
            err[key] = flag;
            setErr({...err});
        }
    }

    const closeDialog = () => {
        setUser({
            email: "",
            password: "",
            name: ""
        });
        setErr({
            email: false,
            name: false
        });
        props.handleClose();
    }

    const addUser = () => {
        props.handleBackdrop();
        closeDialog();
        if ( !err.email && !err.name ) {
            fetch(`${url}/admin/signup`, {
                'method': 'PUT',
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    'email': user.email,
                    'password': user.password,
                    'user_name': user.name
                })
            })
            .then( res => res.json())
            .then( json => {
                props.updateUsers();
            });
        }
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
                        value={user.email}
                        onChange={e => checkUser("email", e.target.value)}
                        error={err.email}
                        helperText={(err.email) ? "This email is already used" : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Name"
                        fullWidth
                        value={user.name}
                        onChange={e => checkUser("name", e.target.value)}
                        error={err.name}
                        helperText={(err.name) ? "This name is already used" : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label="Password"
                        type="password"
                        fullWidth
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
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

export default RegisterDialog;