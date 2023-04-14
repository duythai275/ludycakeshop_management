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
const ProductEditorDialog = ({ open, handleClose, data, categories, editProduct, addProduct }) => {
    // use styke
    const classes = useStyles();

    // for image uploading
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    // inputs
    const [product, setProduct] = useState({
        "name": data.name,
        "description": data.description,
        "brand": data.brand,
        "price": data.price,
        "active": data.active,
        "category": data.category,
        "quantity": data.quantity,
        "weightValue": data.weightValue,
        "image": data.image,

    });

    // authentication
    const { url, token } = useContext(AccessContext);
    
    // alert for any action
    const { handleAlert } = useContext(AlertContext);

    // update inputs
    const updateValue = ( value, attr ) => {
        product[attr] = value;
        setProduct({...product});
    }

    // handle add and update product
    const handleProduct = () => {
        if ( data.name === "New Product" ) {
            let formData = new FormData();
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("brand", product.brand);
            formData.append("price", product.price + "");
            formData.append("active", product.active + "");
            formData.append("category", ((typeof product.category) === "object") ? ("" + product.category.id) : ("" + product.category));
            formData.append("quantity", product.quantity + "");
            formData.append("weightValue", product.weightValue + "");
            if ( file !== null ) {
                formData.append("image_file", file, file.name);
            } 
            else {
                formData.append("image_file", new Blob(), "/path/to/file");
            }
                
            fetch(`${url}/admin/product`, {
                'method': 'POST',
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    // 'Content-Type': 'application/json'
                },
                'body': formData
            }).then( res => res.json())
            .then(result => {
                addProduct(result);
                handleAlert(true, "Added Successfully!");
                setProduct({
                    "name": data.name,
                    "description": data.description,
                    "brand": data.brand,
                    "price": data.price,
                    "active": data.active,
                    "category": data.category,
                    "quantity": data.quantity,
                    "weightValue": data.weightValue,
                    "image": data.image,
            
                });
            });

        } else {
            let formData1 = new FormData();
            formData1.append("id", data.id + "");
            formData1.append("name", product.name);
            formData1.append("description", product.description);
            formData1.append("brand", product.brand);
            formData1.append("price", product.price + "");
            formData1.append("active", product.active + "");
            formData1.append("category", ((typeof product.category) === "object") ? ("" + product.category.id) : ("" + product.category));
            formData1.append("quantity", product.quantity + "");
            formData1.append("weightValue", product.weightValue + "");
            if ( file !== null ) {
                formData1.append("image_file", file, file.name);
            } 
            else {
                formData1.append("image_file", new Blob(), "/path/to/file");
            }

            fetch(`${url}/admin/product`, {
                'method': 'PUT',
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    // 'Content-Type': 'application/json'
                },
                'body': formData1
            }).then( res => res.json())
            .then(result => {
                editProduct(product);
                handleAlert(true, "Edited Successfully!");
            });


        }
        handleClose();
    }

    // handle closing dialog
    const closeDialog = () => {
        handleClose();
        setProduct({
            "name": data.name,
            "description": data.description,
            "brand": data.brand,
            "price": data.price,
            "active": data.active,
            "category": data.category,
            "quantity": data.quantity,
            "weightValue": data.weightValue,
            "image": data.image,
        });
    }

    // handle uploading image
    const handleUploadImage = f => {
        const reader = new FileReader();

        reader.onload = e => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(f);
        setFile(f);
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
                                image={(image === null) ? product.image : image}
                            /><Divider />
                            <CardActions>
                                <label htmlFor="upload-image" style={{display:"inline-block", width: "100%"}}>
                                    <input 
                                        style={{ display: "none" }}
                                        accept="image/png, image/jpeg"
                                        id="upload-image"
                                        type="file"
                                        onChange={e => handleUploadImage(e.target.files[0])}
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
                                        <Select label="Category" value={((typeof product.category) === "object") ? product.category.id : product.category} onChange={event => updateValue(event.target.value, "category")} >
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
                                            control={<Checkbox checked={product.active} color="primary" onChange={ () => updateValue(!product.active,"active") } />}
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