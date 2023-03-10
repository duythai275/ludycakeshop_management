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

// import React contexts
import AccessContext from '../../contexts/access.context';

// import Redux action
import { updateOrderStatus } from '../../redux/order/order.action';

// import functions for requesting to server 
import { getAllWithAuth, updating } from '../../utils/fetching';

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
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
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

    // inputs - status
    const [activeStep, setActiveStep] = useState(
        (props.order.status === "pending") ? 0 : 
            (props.order.status === "confirmed") ? 1 : 
                (props.order.status === "ready") ? 2 : 3
    );

    // data
    const [order, setOrder] = useState({
        "id": props.order.id,
        "orderDate": props.order.orderDate,
        "paidDate": props.order.paidDate,
        "priceSum": props.order.priceSum,
        "status": props.order.status,
        "email": props.order.email,
        "phone": props.order.phone,
        "orderName": props.order.orderName,
        // "itemList": []
        "itemList": props.order.itemList
    });

    // load data in first time
    useEffect(() => {
        getAllWithAuth(`${url}/admin/order/${props.order.id}`, token)
        .then(json => {
            // order["itemList"] = json.itemList;
            // order["status"] = json.status;
            // order["paidDate"] = json.paidDate;
            // setOrder({...order});
        });
    }, [activeStep]);

    // change status backward
    const changeStatusBack = () => {
        const obj = {
            "id": order.id,
            "orderDate": order.orderDate,
            "paidDate": order.paidDate,
            "priceSum": order.priceSum,
            "status": "confirmed",
            "email": order.email,
            "phone": order.phone,
            "orderName": order.orderName
        };

        // updating(`${url}/admin/order`, token, obj)
        // .then(res => {
        //     setActiveStep(1);
        //     props.updateOrders();
        //     props.updateOrder(obj);
        // });

        setActiveStep(1);
        props.updateOrders();
        props.updateOrder(obj);
    }

    // change status forward
    const changeStatus = () => {
        const d = new Date();
        const currentDate = `${d.getFullYear()}-${((d.getMonth()+1)<10) ? `0${d.getMonth()+1}` : (d.getMonth()+1)}-${(d.getDate() < 10) ? `0${d.getDate()}` : d.getDate()}`;
        console.log(currentDate);
        
        const obj = {
            "id": order.id,
            "orderDate": order.orderDate,
            "paidDate": (activeStep === 2) ? currentDate : order.paidDate,
            "priceSum": order.priceSum,
            "status": (activeStep === 0) ? "confirmed" : (activeStep === 1) ? "ready" : "paid",
            "email": order.email,
            "phone": order.phone,
            "orderName": order.orderName
        };

        // updating(`${url}/admin/order`, token, obj)
        // .then(res => {
        //     setActiveStep(activeStep + 1);
        //     props.updateOrders();
        //     props.updateOrder(obj);
        // });
        
        setActiveStep(activeStep + 1);
        props.updateOrders();
        props.updateOrder(obj);
    }

    return (
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
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
                        order.itemList.map( item => 
                            <ListItem className={classes.listItem} key={item.order_items_id}>
                                <ListItemText primary={item.product_name} secondary={"Qty: " + item.quantity} />
                                <Typography variant="body2">${item.total}</Typography>
                            </ListItem>
                        )
                    }
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Total" />
                            <Typography variant="subtitle1" className={classes.total}>
                                ${order.priceSum}
                            </Typography>
                        </ListItem>
                    </List>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}></Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h6" gutterBottom className={classes.title}>
                                Order Details
                            </Typography>
                            <Grid container>
                                <Grid item xs={6}>Email:</Grid>
                                <Grid item xs={6} align="right">{order.email}</Grid>
                                <Grid item xs={6}>Phone:</Grid>
                                <Grid item xs={6} align="right">{order.phone}</Grid>
                                <Grid item xs={6}>Ordered Date:</Grid>
                                <Grid item xs={6} align="right">{order.orderDate}</Grid>
                                {
                                    ( order.status === "paid" ) ? <Grid item xs={6}>Paid Date:</Grid> : ""
                                }
                                {
                                    ( order.status === "paid" ) ? <Grid item xs={6} align="right">{order.paidDate}</Grid> : ""
                                }
                                
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