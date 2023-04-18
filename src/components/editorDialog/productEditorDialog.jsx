// import React modules
import React, { useState, useContext } from 'react';

// import React Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Redux action
import { editProduct, fetchAllProducts } from '../../redux/product/product.action';

// import selector for Redux
import { selectCategories } from '../../redux/category/category.selector';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import styles for the component
import { makeStyles } from '@material-ui/core/styles';

// import Material UI
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

// import functions for requesting to server 
import { adding, updating, getAll } from '../../utils/fetching';

// define styles
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
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(6),
        }
    },
    image: {
        width: 'auto',
        margin: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
        }
    },
    formControl: {
        width: '100%'
    },
    chip: {
        '& > *': {
            margin: theme.spacing(0.5),
        }
    }
}));

/**
 * Animation for Component
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Editor dialog for Product
 * @param {*} props of component 
 * @returns component
 */
const ProductEditorDialog = ({ open, handleClose, data, categories, editProduct, addProduct, handleBackdrop }) => {
    // use styke
    const classes = useStyles();

    // inputs
    const [product, setProduct] = useState({
        "name": data.name,
        "description": data.description,
        "price": data.price,
        "active": data.active,
        "category": { id: data.category.id },
        "quantity": data.quantity,
        "image": data.image,

    });

    // authentication
    const { url, token } = useContext(AccessContext);
    
    // alert for any action
    const { handleAlert } = useContext(AlertContext);

    // update inputs
    const updateValue = ( value, attr ) => {
        if ( attr === "category" ) {
            product[attr] = {
                id: value
            }
        }
        else {
            product[attr] = value;
        }
        
        setProduct({...product});
    }

    // handle add and update product
    const handleProduct = () => {
        handleBackdrop(true);
        if ( data.name === "New Product" ) {
            adding(`${url}/products`, {
                productName: product.name,
                categoryID: product.category.id,
                unitPrice: product.price,
                quantityAvailable: product.quantity,
                productDescription: product.description,
                discontinued: product.active,
                productImage: product.image
            })
            .then(result => {
                getAll(`${url}/products`).then( arr => {
                    addProduct(arr.map( product => ({
                        id: product.productID,
                        name: product.productName,
                        category: {
                            id: product.categoryID
                        },
                        price: parseFloat(product.unitPrice),
                        quantity: parseInt(product.quantityAvailable),
                        description: product.productDescription,
                        active: product.discontinued,
                        image: product.productImage
                    }) ));
                    handleBackdrop(false);
                    handleAlert(true, "Added Successfully!");
                    setProduct({
                        name: "New Product",
                        category: { id: 0 },
                        active: false
                    });
                });
            });
        } else {
            updating(`${url}/products/${data.id}`, {
                productName: product.name,
                categoryID: product.category.id,
                unitPrice: product.price,
                quantityAvailable: product.quantity,
                productDescription: product.description,
                discontinued: product.active,
                productImage: product.image
            })
            .then(result => {
                editProduct({
                    id: data.id,
                    name: product.name,
                    category: { id: product.category.id },
                    price: parseFloat(product.price),
                    quantity: parseInt(product.quantity),
                    description: product.description,
                    active: product.active,
                    image: product.image
                });
                handleBackdrop(false);
                handleAlert(true, "Editted Successfully!");
            });
        }
        handleClose();
    }

    // handle closing dialog
    const closeDialog = () => {
        handleClose();
        setProduct({
            name: data.name,
            description: data.description,
            brand: data.brand,
            price: data.price,
            active: data.active,
            category: data.category.id,
            quantity: data.quantity,
            weightValue: data.weightValue,
            image: data.image
        });
    }

    // handle uploading image
    const handleUploadImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = e => {
            setProduct({
                ...product,
                image: e.target.result.split("base64,")[1]
            });
        }

        reader.readAsDataURL(file);
    }

    return (
        <Dialog fullScreen open={open} onClose={() => closeDialog()} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => closeDialog()}>
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
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <Card className={classes.image}>
                            <CardMedia 
                                component="img"
                                height="310"
                                // image={(image === null) ? product.image : image}
                                src={(product.image === null) ? null : `data:image;base64,${product.image}`}
                            /><Divider />
                            <CardActions>
                                <label htmlFor="upload-image" style={{display:"inline-block", width: "100%"}}>
                                    <input 
                                        style={{ display: "none" }}
                                        accept="image/png, image/jpeg"
                                        id="upload-image"
                                        type="file"
                                        onChange={handleUploadImage}
                                    />
                                    <Button startIcon={<PhotoCamera />} fullWidth variant="text" color="primary" size="small" component="span">
                                        Upload Image
                                    </Button>
                                </label>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <TextField label="Name" fullWidth value={product.name} onChange={event => updateValue(event.target.value, "name")}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Category</InputLabel>
                                        <Select label="Category" value={product.category.id} onChange={event => updateValue(event.target.value, "category")} >
                                            { 
                                                categories.map( cate => <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem> )
                                            }
                                            
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Description" multiline rows={4} fullWidth value={product.description} onChange={event => updateValue(event.target.value, "description")} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Price" fullWidth value={product.price} onChange={event => updateValue(event.target.value, "price")} />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Quantity" fullWidth value={product.quantity} onChange={event => updateValue(event.target.value, "quantity")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormControlLabel 
                                            control={<Checkbox checked={!product.active} color="primary" onChange={ () => updateValue(!product.active,"active") } />}
                                            label="Active"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </Dialog>
    )
}

// map state to props of the component
const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    editProduct: product => dispatch(editProduct(product)),
    addProduct: products => dispatch(fetchAllProducts(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditorDialog);