import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';

import Products from '../product/product.component';
import Categories from '../category/category.component';
import WeightTypes from '../weightType/weightType.component';
import Settings from '../intro/setting.component';
import Reports from '../report/report.component';
import Menu from '../mainMenu/menu.component';

import AccessContext from '../../contexts/access.context';

import { fetchAllCategories } from '../../redux/category/category.action';
import { fetchAllProducts } from '../../redux/product/product.action';
import { fetchAllWeightTypes } from '../../redux/weightType/weightType.action';
import { getAll, getAllWithAuth } from '../../utils/fetching';

import { useStyles } from './mainpage.styles';

const Mainpage = ({ setCategories, setProducts, setWeightType }) => {
    const classes = useStyles();
    const { url, token } = useContext(AccessContext);

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
    } )
    

    return (
    <div className={classes.root}>
        <Menu />
        <main className={classes.content}>
            <div className={classes.appBarSpacer}></div>
            <Container /*maxWidth="1g"*/ className={classes.container}>
                
                            <Switch>
                                <Route exact path="/products" component={Products} />
                                <Route exact path="/categories" component={Categories} />
                                <Route exact path="/weightTypes" component={WeightTypes} />
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
    setWeightType: weightTypes => dispatch(fetchAllWeightTypes(weightTypes))
});

export default connect(null, mapDispatchToProps)(Mainpage);