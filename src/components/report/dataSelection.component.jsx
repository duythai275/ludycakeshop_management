import React, { useEffect, useState } from 'react';
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

    const [type, setType] = useState("category");
    
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
                                value={type}
                                onChange={e => setType(e.target.value) }
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
                        <TextField label="Search Product" fullWidth size="small" 
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
                                                // onClick={() => filterBy("","email")}
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
                        <ListItem button>
                            <ListItemText primary="Product 1" secondary="Meat" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Product 2" secondary="Product" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Product 3" secondary="Grocery" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Product 4" secondary="Grocery" />
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardActions>
                        <TextField label="Product" fullWidth size="small" value={"1 selected item"} disabled />
                    </CardActions>
                    <Divider />
                    <List disablePadding className={classes.listPaper1} dense={true}>
                        <ListItem button>
                            <ListItemIcon>
                                <IconButton size="small">
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary="Product 5" secondary="Produce" />
                        </ListItem>
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