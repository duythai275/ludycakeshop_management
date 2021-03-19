import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Orders from '../order/order.compoment';
import Products from '../product/product.component';
import Categories from '../category/category.component';
import WeightTypes from '../weightType/weightType.component';
import Settings from '../intro/setting.component';
import Reports from '../report/report.component';
import Menu from '../mainMenu/menu.component';
import Users from '../user/user.component';
import Events from '../event/event.component';

import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

import { fetchAllCategories } from '../../redux/category/category.action';
import { fetchAllProducts } from '../../redux/product/product.action';
import { fetchAllWeightTypes } from '../../redux/weightType/weightType.action';
import { getAll, getAllWithAuth } from '../../utils/fetching';

import { useStyles } from './mainpage.styles';

const AlertNotification = () => {
    const { alert, alertMsg, handleAlert } = useContext(AlertContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        handleAlert(false, "");
    }

    return (
    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={alert}
        autoHideDuration={3000}
        onClose={handleClose}
        // message={alertMsg}
        // action={
        //   <React.Fragment>
        //     <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        //       <CloseIcon fontSize="small" />
        //     </IconButton>
        //   </React.Fragment>
        // }
    >
        <Alert onClose={handleClose} severity="success" variant="filled">{alertMsg}</Alert>
    </Snackbar>
)}

const Mainpage = ({ setCategories, setProducts, setWeightType }) => {
    const classes = useStyles();

    const { url, token } = useContext(AccessContext);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    useEffect( () => {
        Promise.all([
            getAll(`${url}/categories`),
            getAllWithAuth(`${url}/admin/product`, token),
            getAll(`${url}/weighttype`)
        ])
        .then( arr => {
            setCategories(arr[0]);
            setProducts(arr[1]);
            setWeightType(arr[2]);
        })
    }, []);

    const handleAlert = ( isOpen, msg ) => {
        setAlert(isOpen);
        setAlertMsg(msg);
    }
    

    return (
        <AlertContext.Provider value={{ alert, alertMsg, handleAlert }}>
            <div className={classes.root}>
                <Menu />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}></div>
                    <Container /*maxWidth="1g"*/ className={classes.container}>
                        <Switch>
                            <Route exact path="/orders" component={Orders} />
                            <Route exact path="/events" component={Events} />
                            <Route exact path="/products" component={Products} />
                            <Route exact path="/categories" component={Categories} />
                            <Route exact path="/weightTypes" component={WeightTypes} />
                            <Route exact path="/reports" component={Reports} />
                            <Route exact path="/users" component={Users} />
                            <Route exact path="/settings" component={Settings} />
                        </Switch>
                    </Container>
                </main>
            </div>
            <AlertNotification />
        </AlertContext.Provider>
)}

const mapDispatchToProps = dispatch => ({
    setCategories: categories => dispatch(fetchAllCategories(categories)),
    setProducts: products => dispatch(fetchAllProducts(products)),
    setWeightType: weightTypes => dispatch(fetchAllWeightTypes(weightTypes))
});

export default connect(null, mapDispatchToProps)(Mainpage);