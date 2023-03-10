// import React modules
import React, { useState, useEffect, useContext } from 'react';

// import React Router
import { Switch, Route } from 'react-router-dom';

// import React Redux
import { connect } from 'react-redux';

// import Material UI
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// import management pages
import Orders from '../order/order.compoment';
import Products from '../product/product.component';
import Categories from '../category/category.component';
import WeightTypes from '../weightType/weightType.component';
import Banners from '../banner/banner.component';
import Reports from '../report/report.component';
import Menu from '../mainMenu/menu.component';
import Users from '../user/user.component';
import Events from '../event/event.component';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import Redux action
import { fetchAllCategories } from '../../redux/category/category.action';
import { fetchAllProducts } from '../../redux/product/product.action';
import { fetchAllWeightTypes } from '../../redux/weightType/weightType.action';
import { getOrders } from '../../redux/order/order.action';

// import functions for requesting to server 
import { getAll, getAllWithAuth } from '../../utils/fetching';

// import styles for the component
import { useStyles } from './mainpage.styles';

/**
 * Component of Alert Notification
 * @returns component
 */
const AlertNotification = () => {
    // user alert contexts
    const { alert, alertMsg, handleAlert } = useContext(AlertContext);

    // handle Close Notification
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
    >
        <Alert onClose={handleClose} severity="success" variant="filled">{alertMsg}</Alert>
    </Snackbar>
)}

/**
 * Component of mainpage
 * @param {*} props of the component 
 * @returns component
 */
const Mainpage = ({ setOrders, setCategories, setProducts, setWeightType }) => {
    // use style
    const classes = useStyles();

    // authenticatio
    const { url, token } = useContext(AccessContext);
    
    // state use for Alert notification component
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    // load data to Redux store in first time
    useEffect( () => {
        // Promise.all([
        //     getAllWithAuth(`${url}/admin/order?all=true`, token),
        //     getAll(`${url}/categories`),
        //     getAllWithAuth(`${url}/admin/product`, token),
        //     getAll(`${url}/weighttype`)
        // ])
        // .then( arr => {
        //     setOrders(arr[0].content);
        //     setCategories(arr[1]);
        //     setProducts(arr[2]);
        //     setWeightType(arr[3]);
        // })
    }, []);

    // handle Alert
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
                            <Route exact path="/banners" component={Banners} />
                        </Switch>
                    </Container>
                </main>
            </div>
            <AlertNotification />
        </AlertContext.Provider>
)}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    setCategories: categories => dispatch(fetchAllCategories(categories)),
    setProducts: products => dispatch(fetchAllProducts(products)),
    setWeightType: weightTypes => dispatch(fetchAllWeightTypes(weightTypes)),
    setOrders: orders => dispatch(getOrders(orders))
});

export default connect(null, mapDispatchToProps)(Mainpage);