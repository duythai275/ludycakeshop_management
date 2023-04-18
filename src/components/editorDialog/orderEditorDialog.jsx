// import React modules
import React, { useEffect, useContext, useState } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// import React contexts
import AccessContext from '../../contexts/access.context';

// import Redux action
import { updateOrderStatus } from '../../redux/order/order.action';

// import functions for requesting to server 
import { getAll, updating } from '../../utils/fetching';

// import styles from material
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 220,
        // height: 300
    },
    listItem: {
        padding: theme.spacing(0.1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

/**
 * Animation for Component
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Editor dialog for Order
 * @param {*} props of component
 * @returns component
 */
const OrderEditorDialog = props => {
    // use style
    const classes = useStyles();

    // authentication
    const { url, token } = useContext(AccessContext);
    const [backdrop, setBackdrop] = useState(false);

    // inputs - status
    const [activeStep, setActiveStep] = useState(
        (props.order.orderStatus === "pending") ? 0 : 
            (props.order.orderStatus === "confirmed") ? 1 : 
                (props.order.orderStatus === "ready") ? 2 : 3
    );

    // data
    const [order, setOrder] = useState(props.order);

    // change status backward
    const changeStatusBack = () => {
        setBackdrop(true);
        const obj = {
            ...order,
            orderStatus: "confirmed"
        };

        updating(`${url}/orders/${order.orderID}`, obj)
        .then(res => {
            setActiveStep(1);
            props.updateOrder(obj);
            setBackdrop(false);
        });
    }

    // change status forward
    const changeStatus = () => {
        setBackdrop(true);
        const obj = {
            ...order,
            orderStatus: (activeStep === 0) ? "confirmed" : (activeStep === 1) ? "ready" : "paid"
        };

        updating(`${url}/orders/${order.orderID}`, obj)
        .then(res => {
            setActiveStep(activeStep + 1);
            props.updateOrder(obj);
            setBackdrop(false);
        });
    }

    return (
    <>
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle><Typography component="h1" variant="h4" align="center">{props.order.orderName}</Typography></DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                        {
                            ["Waiting for customer's confirmation","Being prepared","Be ready for picking up","Finished"].map( label => 
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        }
                        </Stepper>
                        <Typography variant="h6" gutterBottom>Order Summary</Typography>
                        <List disablePadding className={classes.list}>
                            {
                                order.orderItems.map( item => 
                                    <ListItem className={classes.listItem} key={`${item.orderID}-${item.product.productID}`}>
                                        <ListItemText primary={item.product.productName} secondary={"Qty: " + item.itemQuantity} />
                                        <Typography variant="body2">${item.itemTotal}</Typography>
                                    </ListItem>
                                )
                            }
                        </List>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}></Grid>
                            <Grid item xs={12} sm={4}>
                                <List disablePadding className={classes.list}>
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary="Subtotal" />
                                        <Typography variant="subtitle1" className={classes.total}>
                                            ${order.subtotal}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary="GST" />
                                        <Typography variant="subtitle1" className={classes.total}>
                                            ${order.gst}
                                        </Typography>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary="Total" />
                                        <Typography variant="subtitle1" className={classes.total}>
                                            ${order.total}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={8}></Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h6" gutterBottom className={classes.title}>
                                    Order Details
                                </Typography>
                                <Grid container>
                                    <Grid item xs={6}>Address:</Grid>
                                    <Grid item xs={6} align="right">{order.customerAddress}</Grid>
                                    <Grid item xs={6}>Email:</Grid>
                                    <Grid item xs={6} align="right">{order.customerEmail}</Grid>
                                    <Grid item xs={6}>Phone:</Grid>
                                    <Grid item xs={6} align="right">{order.customerContactNumber}</Grid>
                                    <Grid item xs={6}>Ordered Date:</Grid>
                                    <Grid item xs={6} align="right">{order.orderDate}</Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button disabled={activeStep !== 2} onClick={changeStatusBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" disabled={activeStep === 3} onClick={changeStatus}>
                    Next
                </Button>
                <Button variant="contained" onClick={props.handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </>
    )
}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    updateOrder: order => dispatch(updateOrderStatus(order))
});

export default connect(null, mapDispatchToProps)(OrderEditorDialog);