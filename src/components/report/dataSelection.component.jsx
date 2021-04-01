import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { selectProducts } from '../../redux/product/product.selector';
import  { selectCategories } from '../../redux/category/category.selector';

import { useStyles } from './report.styles.js';

const DataSelection = props => {
    const classes = useStyles();

    const [search, setSearch] = useState("");

    const uploadList = value => {
        props.changeType(value);
        props.changeData([]);
    }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                select
                                label="Data"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={props.type}
                                onChange={e => uploadList(e.target.value) }
                            >
                                <MenuItem value="category">Departments</MenuItem>
                                <MenuItem value="product">Products</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                select
                                label="Data Type"
                                value={props.dataType}
                                onChange={e => props.changeDataType(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                            >
                                <MenuItem value="Number of Sales">Number of Sales</MenuItem>
                                <MenuItem value="Sales Revenue">Sales Revenue</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActions>
                        <TextField label="Search" fullWidth size="small" value={search} onChange={e => setSearch(e.target.value)}
                            InputProps = {
                                {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setSearch("")}
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    inputProps: {
                                        "aria-label": "Search",
                                    }
                                }
                            }
                        />
                    </CardActions>
                    <Divider />
                    <List disablePadding className={classes.listPaper1} dense={true}>
                    {
                        (props.type === "product") ? props.products.filter(product => !props.data.includes(product) && product.name.toUpperCase().includes(search.toUpperCase())).map( product => 
                            <ListItem key={product.id} button onClick={() => props.changeData([...props.data,...[product]])}>
                                <ListItemText primary={(product.name.length > 23) ? `${product.name.substring(0,20)}...` : product.name} secondary={props.categories.find(category => category.id === product.category).name} />
                                <ListItemIcon>
                                    <IconButton size="small">
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ) : props.categories.filter(category => !props.data.includes(category) && category.name.toUpperCase().includes(search.toUpperCase())).map( category => 
                            <ListItem key={category.id} button onClick={() => props.changeData([...props.data,...[category]])}>
                                <ListItemText primary={category.name} secondary={`${props.products.filter(product => product.category === category.id).length} items`} />
                                <ListItemIcon>
                                    <IconButton size="small">
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        )
                    }
                    </List>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActions>
                        <TextField label="Product" fullWidth size="small" value={`${props.data.length} selected items`} disabled />
                    </CardActions>
                    <Divider />
                    <List disablePadding className={classes.listPaper1} dense={true}>
                    {
                        (props.type === "product") ? props.data.map( product => 
                            <ListItem key={product.id} button onClick={() => props.changeData(props.data.filter(pData => pData.id !== product.id))}>
                                <ListItemIcon>
                                    <IconButton size="small">
                                        <KeyboardArrowLeftIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary={(product.name.length > 23) ? `${product.name.substring(0,20)}...` : product.name} secondary={props.categories.find(category => category.id === product.category).name} />
                            </ListItem>
                        ) : props.data.map( category => 
                            <ListItem key={category.id} button onClick={() => props.changeData(props.data.filter(pData => pData.id !== category.id))}>
                                <ListItemIcon>
                                    <IconButton size="small">
                                        <KeyboardArrowLeftIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary={category.name} secondary={`${props.products.filter(product => product.category === category.id).length} items`} />
                            </ListItem>
                        )
                    }
                    </List>
                </Card>
            </Grid>
        </Grid>
        
    )
}

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    categories: selectCategories
});

export default connect(mapStateToProps)(DataSelection);