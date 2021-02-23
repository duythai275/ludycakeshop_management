import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addProduct } from '../../redux/product/product.action';
import { editProduct } from '../../redux/product/product.action';

import  { selectCategories } from '../../redux/category/category.selector';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    subTitle: {
        // paddingBottom: theme.spacing(1)
    },
    layout: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: '#F3F3F3'
    },
    paper: {
        width: 'auto',
        margin: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(6),
        }
    },
    formControl: {
        width: '100%'
    },
    chip: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
        // paddingTop: theme.spacing(2)
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditorDialog = ({ open, handleClose, data, categories, editProduct, addProduct }) => {
    const classes = useStyles();

    const [product, setProduct] = useState(data);

    const { url, token } = useContext(AccessContext);
    const { handleAlert } = useContext(AlertContext);

    const updateValue = ( value, attr ) => {
        product[attr] = value;
        setProduct({...product});
    }

    const handleProduct = () => {
        if ( data.name === "New Product" ) {
            product.category = product.category[0].id;
            product.price = parseFloat(product.price);
            product.quantity = parseInt(product.quantity);
            product.weightType = parseInt(product.weightType);

            fetch(`${url}/admin/product`, {
                'method': 'POST',
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(product)
            })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                addProduct(product);
                handleAlert(true, "Added Successfully!");
            })
            .catch(error => console.log('error', error));

        } else {
            product.category = product.category[0].id;
            product.price = parseFloat(product.price);
            product.quantity = parseInt(product.quantity);
            product.weightType = parseInt(product.weightType);

            fetch(`${url}/admin/product`, {
                'method': 'PUT',
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(product)
            })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                editProduct(product);
                handleAlert(true, "Edited Successfully!");
            })
            .catch(error => console.log('error', error));

        
        }
        handleClose();
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {data.name}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleProduct}>
                        { (data.name === "New Product") ? "Add" : "Save" }
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField label="Name" fullWidth value={product.name} onChange={event => updateValue(event.target.value, "name")}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Brand" fullWidth value={product.brand} onChange={event => updateValue(event.target.value, "brand")}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Description" fullWidth value={product.description} onChange={event => updateValue(event.target.value, "description")} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Price" fullWidth value={product.price} onChange={event => updateValue(event.target.value, "price")} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Category</InputLabel>
                                <Select label="Category" value={Array.isArray(product.category) ? product.category[0].id : ""} onChange={event => updateValue([{id: event.target.value}], "category")} >
                                    { 
                                        categories.map( cate => <MenuItem value={cate.id}>{cate.name}</MenuItem> )
                                    }
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel 
                                control={<Checkbox checked={product.active} color="primary" onChange={ () => updateValue(!product.active,"active") } />}
                                label="Active"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Image" fullWidth value={product.image} onChange={event => updateValue(event.target.value, "image")} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Quantity" fullWidth value={product.quantity} onChange={event => updateValue(event.target.value, "quantity")} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Weight Value" fullWidth value={product.weightValue} onChange={event => updateValue(event.target.value, "weightValue")} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Weight Type" fullWidth value={product.weightType} onChange={event => updateValue(event.target.value, "weightType")} />
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </Dialog>
    )
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

const mapDispatchToProps = dispatch => ({
    editProduct: product => dispatch(editProduct(product)),
    addProduct: product => dispatch(addProduct(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorDialog);