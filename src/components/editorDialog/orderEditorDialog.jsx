import React, { useEffect, useContext, useState } from 'react';

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

import AccessContext from '../../contexts/access.context';

import { getAllWithAuth } from '../../utils/fetching';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OrderEditorDialog = props => {
    const classes = useStyles();

    const { url, token } = useContext(AccessContext);

    const [activeStep, setActiveStep] = useState(
        (props.order.status === "pending") ? 0 : 
            (props.order.status === "confirmed") ? 1 : 
                (props.order.status === "ready") ? 2 : 3
    );

    const [order, setOrder] = useState({
        "id": props.order.id,
        "orderDate": props.order.orderDate,
        "paidDate": props.order.paidDate,
        "priceSum": props.order.priceSum,
        "status": props.order.status,
        "email": props.order.email,
        "phone": props.order.phone,
        "orderName": props.order.orderName,
        "itemList": []
    });

    useEffect(() => {
        getAllWithAuth(`${url}/admin/order/${props.order.id}`, token)
        .then(json => {
            order["itemList"] = json.itemList;
            setOrder({...order});
            console.log("TEST edit");
        });
    }, [activeStep]);

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
            <List disablePadding>
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
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
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
        </DialogContent>
        <DialogActions>
            <Button disabled={activeStep !== 2} onClick={() => setActiveStep(1)}>
                Back
            </Button>
            <Button variant="contained" color="primary" disabled={activeStep === 3} onClick={() => setActiveStep(activeStep + 1)}>
                Next
            </Button>
            <Button variant="contained" onClick={props.handleClose}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default OrderEditorDialog;