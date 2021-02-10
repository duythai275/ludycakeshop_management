import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Products from '../product/product.component';
import Categories from '../category/category.component';
import Settings from '../intro/setting.component';
import Reports from '../report/report.component';
import Menu from '../menu/menu.component';

import AccessContext from '../../contexts/access.context';

import { fetchAllCategories } from '../../redux/category/category.action';
import { fetchAllProducts } from '../../redux/product/product.action';
import { fetchAllProductCategories } from '../../redux/productCategory/productCategory.action';

import { useStyles } from './mainpage.styles';

const Mainpage = ({ setCategories, setProducts, setProductCategories }) => {
    const classes = useStyles();
    const { url } = useContext(AccessContext);

    // useEffect( () => {
    //     Promise.all([
    //         fetch(`${url}/category`).then( res => res.json()),
    //         fetch(`${url}/product`).then( res => res.json()),
    //         fetch(`${url}/productCategory`).then( res => res.json())
    //     ])
    //     .then( arr => {
    //         setCategories(arr[0]);
    //         setProducts(arr[1]);
    //         setProductCategories(arr[2]);
    //     })
    // } )
    

    return (
    <div className={classes.root}>
        <Menu />
        <main className={classes.content}>
            <div className={classes.appBarSpacer}></div>
            <Container /*maxWidth="1g"*/ className={classes.container}>
                
                            <Switch>
                                <Route exact path="/products" component={Products} />
                                <Route exact path="/categories" component={Categories} />
                                <Route exact path="/reports" component={Reports} />
                                <Route exact path="/settings" component={Settings} />
                            </Switch>
                        
            </Container>
        </main>
    </div>
)}

const mapDispatchToProps = dispatch => ({
    setCategories: categories => dispatch(fetchAllCategories(categories)),
    setProducts: products => dispatch(fetchAllProducts(products)),
    setProductCategories: productCategories => dispatch(fetchAllProductCategories(productCategories))
});

export default connect(null, mapDispatchToProps)(Mainpage);