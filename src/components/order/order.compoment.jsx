// import React modules
import React, { useState, useEffect, useContext } from 'react';

// import React Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Material UI
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import CachedIcon from '@material-ui/icons/Cached';

// import row components
import Row from './row.component';

// import React contexts
import AccessContext from '../../contexts/access.context';

// import Redux action
import { getOrders } from '../../redux/order/order.action';

// import functions for requesting to server 
import { getAll } from '../../utils/fetching';

import { selectOrders } from '../../redux/order/order.selector';

// import styles for the component
import { useStyles } from './order.styles';

/**
 * Component of order management page
 * @param {*} props of the component 
 * @returns component
 */
const Orders = ({storedOrders,loadOrdersToStore}) => {
    // use style
    const classes = useStyles();

    // authentication
    const { url, token } = useContext(AccessContext);

    const [backdrop, setBackdrop] = useState(false);

    // data
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);

    // paging
    const [page, setPage] = useState(0);

    // filter
    const [filters, setFilters] = useState({
        customerName: "",
        customerEmail: "",
        customerContactNumber: "",
        orderDate: "",
        orderStatus: ""
    });

    // handle searching
    const filterBy = (value, property) => {
        filters[property] = value;
        setPage(0);
        setFilters({
            ...filters
        });
    }

    // handle paging
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // load data
    const loadOrders = () => {
        setBackdrop(true);
        getAll(`${url}/orders`).then( res => {
            loadOrdersToStore(res);
            setBackdrop(false);
        });
    }

    useEffect(() => {
        setTotalOrders(orders.length);
    }, [orders])

    // load data when component loads in first time
    useEffect( () => {
        setOrders(storedOrders.filter( o => 
            o.orderDate.toUpperCase().includes(filters.orderDate.toUpperCase())
            && o.customerName.toUpperCase().includes(filters.customerName.toUpperCase())
            && o.customerEmail.toUpperCase().includes(filters.customerEmail.toUpperCase())
            && o.customerContactNumber.toUpperCase().includes(filters.customerContactNumber.toUpperCase())
            && o.orderStatus.toUpperCase().includes(filters.orderStatus.toUpperCase())
        ));
    }, [page,filters,storedOrders]);

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
                                            onChange={event => filterBy(event.target.value,"customerName")}
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
                                                                onClick={() => filterBy("","customerName")}
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
                                            onChange={event => filterBy(event.target.value,"customerEmail")}
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
                                                                onClick={() => filterBy("","customerEmail")}
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
                                            onChange={event => filterBy(event.target.value,"customerContactNumber")}
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
                                                                onClick={() => filterBy("","customerContactNumber")}
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
                                            onChange={event => filterBy(event.target.value,"orderStatus")}
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
                                                                onClick={() => filterBy("","orderStatus")}
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
                                    orders.slice(page * 10, page * 10 + 10).map( order => <Row key={order.orderID} order={order} />)
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
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    loadOrdersToStore: orders => dispatch(getOrders(orders))
});

// map state to props of the component
const mapStateToProps = createStructuredSelector({
    storedOrders: selectOrders
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders);