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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// import management pages
import Orders from '../order/order.compoment';
import Products from '../product/product.component';
import Categories from '../category/category.component';
import Customers from '../customer/customer.component';
import Menu from '../mainMenu/menu.component';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import Redux action
import { fetchAllCategories } from '../../redux/category/category.action';
import { fetchAllProducts } from '../../redux/product/product.action';
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
const Mainpage = ({ setOrders, setCategories, setProducts }) => {
    // use style
    const classes = useStyles();

    // authenticatio
    const { url, token } = useContext(AccessContext);

    const [backdrop, setBackdrop] = useState(false);

    // state use for Alert notification component
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    // load data to Redux store in first time
    useEffect( () => {
        setBackdrop(true);
        Promise.all([
            getAll(`${url}/orders`),
            getAll(`${url}/categories`),
            getAll(`${url}/products`),
        ])
        .then( arr => {
            setOrders(arr[0]);
            setCategories(arr[1].map( cate => ({
                id: cate.categoryID,
                name: cate.categoryName,
                image: cate.categoryImage
            }) ));
            setProducts(arr[2].map( product => ({
                id: product.productID,
                name: product.productName,
                category: {
                    id: product.categoryID
                },
                price: product.unitPrice,
                quantity: product.quantityAvailable,
                description: product.productDescription,
                active: product.discontinued,
                image: product.productImage
            }) ));
            setBackdrop(false);
        })
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
                            <Route exact path="/products" component={Products} />
                            <Route exact path="/categories" component={Categories} />
                            <Route exact path="/customers" component={Customers} />
                        </Switch>
                    </Container>
                </main>
                <Backdrop className={classes.backdrop} open={backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
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
    setOrders: orders => dispatch(getOrders(orders))
});

export default connect(null, mapDispatchToProps)(Mainpage);