import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import CachedIcon from '@material-ui/icons/Cached';

import Row from './row.component';

import AccessContext from '../../contexts/access.context';

import { getOrders } from '../../redux/order/order.action';
import { getAllWithAuth } from '../../utils/fetching';
// import { selectOrders } from '../../redux/order/order.selector';
import { useStyles } from './order.styles';

const Orders = ({loadOrdersToStore}) => {
    const classes = useStyles();

    const { url, token } = useContext(AccessContext);

    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        name: "",
        email: "",
        phone: "",
        orderDate: "",
        status: ""
    });

    const filterBy = (value, property) => {
        // setBackdrop(true);
        filters[property] = value;
        setPage(0);
        setFilters({
            ...filters
        });
    }

    const handleChangePage = (event, newPage) => {
        // setBackdrop(true);
        setPage(newPage);
    };

    const loadOrders = () => {
        // setBackdrop(true);
        let filter = "";
        if ( filters["name"] !== "" ) filter += `name=${filters["name"]}&`;
        if ( filters["email"] !== "" ) filter += `emai=${filters["email"]}&`;
        if ( filters["phone"] !== "" ) filter += `phon=${filters["phone"]}&`;
        if ( filters["orderDate"] !== "" ) filter += `orde=${filters["orderDate"]}:${filters["orderDate"]}&`;
        if ( filters["status"] !== "" ) filter += `stat=${filters["status"]}&`;

        getAllWithAuth(`${url}/admin/order?${filter}page=${(page + 1)}`, token)
        .then(json => {
            setTotalOrders(json.totalElements);
            setOrders(json.content);
            // setBackdrop(false);
        });

        getAllWithAuth(`${url}/admin/order?all=true`, token)
        .then(json => {
            loadOrdersToStore(json.content);
        });
        
    }

    useEffect( () => {
        let filter = "";
        if ( filters["name"] !== "" ) filter += `name=${filters["name"]}&`;
        if ( filters["email"] !== "" ) filter += `emai=${filters["email"]}&`;
        if ( filters["phone"] !== "" ) filter += `phon=${filters["phone"]}&`;
        if ( filters["orderDate"] !== "" ) filter += `orde=${filters["orderDate"]}:${filters["orderDate"]}&`;
        if ( filters["status"] !== "" ) filter += `stat=${filters["status"]}&`;

        getAllWithAuth(`${url}/admin/order?${filter}page=${(page + 1)}`, token)
        .then(json => {
            setTotalOrders(json.totalElements);
            setOrders(json.content);
            // setBackdrop(false);
        });

        getAllWithAuth(`${url}/admin/order?all=true`, token)
        .then(json => {
            loadOrdersToStore(json.content);
        });
    }, [page,filters]);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <div className={classes.title}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Orders
                                </Typography>
                            </div>
                            <div className={classes.pager}>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={totalOrders}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    rowsPerPage={10}
                                />
                            </div>
                        </div>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHead}>
                                        Order Date <br/>
                                        <TextField 
                                            placeholder="Search by Date" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"orderDate")}
                                            value={filters.orderDate}
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
                                                                onClick={() => filterBy("","orderDate")}
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
                                    </TableCell>
                                    <TableCell className={classes.tableHead}>
                                        Order Name <br/>
                                        <TextField 
                                            placeholder="Search by Name" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"name")}
                                            value={filters.name}
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
                                                                onClick={() => filterBy("","name")}
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
                                    </TableCell>
                                    <TableCell className={classes.tableHead}>
                                        Email <br/>
                                        <TextField 
                                            placeholder="Search by Email" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"email")}
                                            value={filters.email}
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
                                                                onClick={() => filterBy("","email")}
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
                                    </TableCell>
                                    <TableCell className={classes.tableHead}>
                                        Phone <br/>
                                        <TextField 
                                            placeholder="Search by Phone Number" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"phone")}
                                            value={filters.phone}
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
                                                                onClick={() => filterBy("","phone")}
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
                                    </TableCell>
                                    <TableCell className={classes.tableHead}>
                                        Status <br/>
                                        <TextField 
                                            placeholder="Search by Status" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"status")}
                                            value={filters.status}
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
                                                                onClick={() => filterBy("","status")}
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
                                    </TableCell>
                                    <TableCell className={classes.tableHead}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders.map( order => <Row key={order.id} order={order} updateOrders={loadOrders}/>)
                                }
                            </TableBody>
                        </Table>
                        <div className={classes.pager}>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={totalOrders}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={10}
                            />
                        </div>
                        <Fab aria-label="add" className={classes.fab} onClick={loadOrders}>
                            <CachedIcon />
                        </Fab>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loadOrdersToStore: orders => dispatch(getOrders(orders))
});

export default connect(null, mapDispatchToProps)(Orders);