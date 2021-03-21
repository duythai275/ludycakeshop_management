import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

import Autocomplete from '@material-ui/lab/Autocomplete';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

import { getAllWithAuth } from '../../utils/fetching';
import { selectProducts } from '../../redux/product/product.selector';
import  { selectCategories } from '../../redux/category/category.selector';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 230,
        // height: 300
    },
    // paper: {
    //     width: '100%',
    //     height: 230,
    //     overflow: 'auto'
    // },
    tableHead: {
        fontWeight: 'bold'
    },
    container: {
      maxHeight: 320,
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        }
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const toFlag = (isoCode) => {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const EventEditorDialog = props => {
    const classes = useStyles();

    const [event, setEvent] = useState({
        "event_title": "",
        "start_date": "",
        "end_date": "",
        "description": "",
        "itemList": []
    });

    const { url, token } = useContext(AccessContext);

    useEffect(() => {
        if ( props.data.title !== "" ) {
            getAllWithAuth(`${url}/admin/event/${props.data.id}`, token)
            .then(json => {
                setEvent(json);
            });
        }
    }, []);

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
                            value={event.event_title}
                            // onChange={event => updateValue(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            value={event.description}
                            // onChange={event => updateValue(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            defaultValue={(event.hasOwnProperty("start_date")) ? event.start_date.substring(0,10) : ""}
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
                            defaultValue={(event.hasOwnProperty("end_date")) ? event.end_date.substring(0,10) : ""}
                            // onChange={event => updateValue(event.target.value)}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br/>
                        <TableContainer component={Paper} className={classes.container}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHead} width={"50%"}>Product Name</TableCell>
                                        <TableCell className={classes.tableHead}>Original Price</TableCell>
                                        <TableCell className={classes.tableHead}>Discount Price</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        event.itemList.map( item => <TableRow>
                                            <TableCell>{item.product_name}</TableCell>
                                            <TableCell>{item.original_price}</TableCell>
                                            <TableCell>{item.discount_price}</TableCell>
                                            <TableCell>
                                                <IconButton size="small">
                                                    <HighlightOffIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>)
                                    }
                                    <TableRow>
                                        <TableCell>
                                            {/* <TextField label="Product Name" variant="outlined" fullWidth size="small" /> */}
                                            <Autocomplete
                                                options={props.products}
                                                classes={{
                                                    option: classes.option,
                                                }}
                                                autoHighlight
                                                getOptionLabel={option => option.name}
                                                renderOption={option => (
                                                    <React.Fragment>
                                                        <span>{toFlag(props.categories.find(category => category.id === option.category).name)}</span>
                                                        {option.name} ({option.brand})
                                                    </React.Fragment>
                                                )}
                                                renderInput={params => (
                                                    <TextField 
                                                        {...params}
                                                        label="Choose a product" 
                                                        variant="outlined" size="small" fullWidth
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                                        }}
                                                    />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell><TextField label="Original Price" variant="outlined" fullWidth size="small" disabled={true}/></TableCell>
                                        <TableCell><TextField label="Discount Price" variant="outlined" fullWidth size="small" /></TableCell>
                                        <TableCell>
                                            <IconButton size="small">
                                                <AddCircleIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
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

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    categories: selectCategories
});

export default connect(mapStateToProps)(EventEditorDialog);