// import React modules
import React, { useState, useContext, useEffect } from 'react';

// import React Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Material UI
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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';

// import React contexts
import AccessContext from '../../contexts/access.context';

// import functions for requesting to server 
import { getAllWithAuth, adding, updating, deleting } from '../../utils/fetching';

// import selector for Redux
import { selectProducts } from '../../redux/product/product.selector';
import  { selectCategories } from '../../redux/category/category.selector';

// import styles from material
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 230,
    },
    tableHead: {
        fontWeight: 'bold'
    },
    container: {
      maxHeight: 250,
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
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
 * function to format options in auto complete field
 * @param {*} isoCode boolean
 * @returns 
 */
const toFlag = (isoCode) => {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

/**
 * Editor dialog for Event
 * @param {*} props of component
 * @returns component
 */
const EventEditorDialog = props => {
    // use style
    const classes = useStyles();

    // inputs
    const [event, setEvent] = useState({
        "title": "",
        "start_date": "",
        "end_date": "",
        "description": "",
        "itemList": [],
        "banner": "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"
    });

    // input for new discount
    const [product, setProduct] = useState(null);
    const [discountPrice, setDiscountPrice] = useState("");

    // for image uploading
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    // authentication
    const { url, token } = useContext(AccessContext);

    // handling update event
    const updateEvent = () => {
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

            if ( image !== null ) {
                if (event.banner === "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png") {
                    adding(`${url}/v2/admin/event_banner`, token, {
                        "id": props.data.id,
                        "comment": event.description,
                        "image": image.substring(image.indexOf(",")+1),
                        "imageExtension": file.type.replace("image/",".")
                    })
                }
                else {
                    updating(`${url}/v2/admin/event_banner`, token, {
                        "id": props.data.id,
                        "comment": event.description,
                        "image": image.substring(image.indexOf(",")+1),
                        "imageExtension": file.type.replace("image/",".")
                    })
                }
            }
        });
    }

    // handling add event
    const addEvent = () => {
        props.handleBackdrop();
        adding(`${url}/admin/event`, token, {
            "title": event.event_title,
            "startDate": event.start_date,
            "endDate": event.end_date,
            "description": event.description
        })
        .then(json => {
            Promise.all([
                event.itemList.map( item => {
                    adding(`${url}/admin/event/${json.content[0].id}`, token, {
                        "productId": item.product_id,
                        "discountPrice": item.discount_price
                    })
                })
            ])
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
                    
            if ( image !== null ) {
                adding(`${url}/v2/admin/event_banner`, token, {
                    "id": json.content[0].id,
                    "comment": event.description,
                    "image": image.substring(image.indexOf(",")+1),
                    "imageExtension": file.type.replace("image/",".")
                })
            }
        });
    }

    // handle change inputs
    const handleChange = ( val, attr ) => {
        event[attr] = val;
        setEvent({...event});
    }

    // handle add discount for event
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
    
    // handle remove a discount from event
    const handleDeleteDiscount = deletedItem => {
        event["itemList"] = event["itemList"].filter( item => 
            deletedItem.product_id !== item.product_id || deletedItem.discount_price !== item.discount_price
        );
        setEvent({
            ...event
        });
    }

    // handle uploading image
    const handleUploadImage = f => {
        const reader = new FileReader();

        reader.onload = e => {
            setImage(e.target.result);
        }

        reader.readAsDataURL(f);
        setFile(f);
    }

    // handle closing dialog
    const closeDialog = () => {
        props.handleClose();
        if ( props.data.title !== "" ) {
            Promise.all([
                getAllWithAuth(`${url}/admin/event/${props.data.id}`, token),
                getAllWithAuth(`${url}/v2/admin/event_banner`, token)
            ])
            .then( arr => {
                setEvent({...arr[0], banner: (arr[1].filter( banner => banner.event.id === props.data.id).length > 0) ? arr[1].filter( banner => banner.event.id === props.data.id)[0].imageUrl : "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"});
            });
        } else {
            setEvent({
                "event_title": "",
                "start_date": "",
                "end_date": "",
                "description": "",
                "itemList": [],
                "banner": "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"
            });
        }
    }

    // load data for first time
    useEffect(() => {
        if ( props.data.title !== "" ) {
            Promise.all([
                getAllWithAuth(`${url}/admin/event/${props.data.id}`, token),
                getAllWithAuth(`${url}/v2/admin/event_banner`, token)
            ])
            .then( arr => {
                setEvent({...arr[0], banner: (arr[1].filter( banner => banner.event.id === props.data.id).length > 0) ? arr[1].filter( banner => banner.event.id === props.data.id)[0].imageUrl : "https://sait-capstone.s3-us-west-2.amazonaws.com/dev_image.png"});
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
                    <Grid item xs={3}>
                        <Card className={classes.image}>
                            <CardMedia 
                                component="img"
                                height="200"
                                image={(image === null) ? event.banner : image}
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
                                        Upload Banner
                                    </Button>
                                </label>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                                    multiline rows={3}
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
                        </Grid>
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

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    categories: selectCategories
});

export default connect(mapStateToProps)(EventEditorDialog);