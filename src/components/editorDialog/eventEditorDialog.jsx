import React, { useState, useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 230,
        // height: 300
    },
    paper: {
        width: '100%',
        height: 230,
        overflow: 'auto'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventEditorDialog = props => {
    const classes = useStyles();
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={props.open} 
            onClose={props.handleClose} 
            TransitionComponent={Transition}
        >
            <DialogTitle>{(props.data.title === "") ? "Add New Event" : "Update Event" }</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Title"
                            fullWidth
                            // value={weightType.name}
                            // onChange={event => updateValue(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            // value={weightType.name}
                            // onChange={event => updateValue(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            // value={weightType.name}
                            // onChange={event => updateValue(event.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            // value={weightType.name}
                            // onChange={event => updateValue(event.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <List disablePadding className={classes.list}>
                                        <ListItem button>
                                            <ListItemText primary="Product 1" secondary="Original Price: $10" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText primary="Product 1" secondary="Original Price: $10" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText primary="Product 1" secondary="Original Price: $10" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText primary="Product 1" secondary="Original Price: $10" />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText primary="Product 1" secondary="Original Price: $10" />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <List disablePadding className={classes.list}>
                                        <ListItem button>
                                            <ListItemText primary="Product 1" secondary="Discount Price: $10" />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid> */}
                        
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            {
                (props.data.title === "") ? 
                    <Button variant="contained" color="primary" /*onClick={handleAddCategory}*/>
                        Add
                    </Button>
                :
                    <Button variant="contained" color="primary" /*onClick={handleUpdateCategory}*/>
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

export default EventEditorDialog;