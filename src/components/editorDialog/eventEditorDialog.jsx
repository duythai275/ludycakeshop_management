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

import { getAllWithAuth, adding, updating, deleting } from '../../utils/fetching';
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
        "title": "",
        "start_date": "",
        "end_date": "",
        "description": "",
        "itemList": []
    });

    const [product, setProduct] = useState(null);
    const [discountPrice, setDiscountPrice] = useState("");

    const { url, token } = useContext(AccessContext);

    const updateEvent = () => {
        console.log(event);
        props.handleBackdrop();
        updating(`${url}/admin/event`, token, {
            "id": event.event_id,
            "title": event.event_title,
            "startDate": event.start_date,
            "endDate": event.end_date,
            "description": event.description
        })
        .then(json => {
            // Delete all discount in db
            // Add all discount in editor
            getAllWithAuth(`${url}/admin/event/${props.data.id}`, token)
            .then(json => {
                Promise.all( json.itemList.map( item => {
                    deleting(`${url}/admin/event/discount?eventid=${json.event_id}&discountid=${item.discount_id}`,token)
                }))
                .then( res => {
                    Promise.all( event.itemList.map( item => {
                        adding(`${url}/admin/event/${json.event_id}`, token, {
                            "productId": item.product_id,
                            "discountPrice": item.discount_price
                        })
                    }))
                    .then( arr => {
                        props.handleClose();
                        props.updateEvents();
                    });
                })
            })
        });
    }

    const addEvent = () => {
        props.handleBackdrop();
        adding(`${url}/admin/event`, token, {
            "title": event.event_title,
            "startDate": event.start_date,
            "endDate": event.end_date,
            "description": event.description
        })
        .then(json => {
            Promise.all( event.itemList.map( item => {
                adding(`${url}/admin/event/${json.content[0].id}`, token, {
                    "productId": item.product_id,
                    "discountPrice": item.discount_price
                })
            }))
            .then( arr => {
                props.handleClose();
                props.updateEvents();
                setEvent({
                    "title": "",
                    "start_date": "",
                    "end_date": "",
                    "description": "",
                    "itemList": []
                });
            });
        });
    }

    const handleChange = ( val, attr ) => {
        event[attr] = val;
        setEvent({...event});
    }

    const handleAddDiscount = () => {
        if ( discountPrice !== "" && product !== null ) {
            event["itemList"].push({
                "product_id": product.id,
                "discount_price": parseFloat(discountPrice),
                "product_name": product.name,
                "original_price": product.price
            });
            setEvent({
                ...event
            });
            setProduct(null);
            setDiscountPrice("");
        }
    }
    
    const handleDeleteDiscount = deletedItem => {
        event["itemList"] = event["itemList"].filter( item => 
            deletedItem.product_id !== item.product_id || deletedItem.discount_price !== item.discount_price
        );
        setEvent({
            ...event
        });
    }

    const closeDialog = () => {
        props.handleClose();
        if ( props.data.title !== "" ) {
            getAllWithAuth(`${url}/admin/event/${props.data.id}`, token)
            .then(json => {
                setEvent(json);
            });
        } else {
            setEvent({
                "event_title": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "itemList": []
            });
        }
    }

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
            maxWidth={'lg'}
            open={props.open} 
            onClose={() => closeDialog()} 
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
                            onChange={event => handleChange(event.target.value, "event_title")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            value={event.description}
                            onChange={event => handleChange(event.target.value, "description")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            defaultValue={(event.hasOwnProperty("start_date")) ? event.start_date.substring(0,10) : ""}
                            onChange={event => handleChange(event.target.value, "start_date")}
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
                            onChange={event => handleChange(event.target.value, "end_date")}
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
                                                <IconButton size="small" onClick={e => handleDeleteDiscount(item)}>
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
                                                value={product}
                                                onChange={(e, selectedProduct) => setProduct(selectedProduct)}
                                            />
                                        </TableCell>
                                        <TableCell><TextField label="Original Price" variant="outlined" fullWidth size="small" disabled={true} value={(product !== null) ? product.price : ""}/></TableCell>
                                        <TableCell><TextField label="Discount Price" variant="outlined" fullWidth size="small" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)}/></TableCell>
                                        <TableCell>
                                            <IconButton size="small" onClick={e => handleAddDiscount()}>
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
                    <Button variant="contained" color="primary" onClick={() => addEvent()}>
                        Add
                    </Button>
                :
                    <Button variant="contained" color="primary" onClick={() => updateEvent()}>
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

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    categories: selectCategories
});

export default connect(mapStateToProps)(EventEditorDialog);